// -------------------------------------------------------- //
// pos_future_prices_execute: Updates product combinations  //
//                  prices as parametrized in table         //
//                  pos_future_prices_item                  //
// -------------------------------------------------------- //
function pos_future_prices_execute() {

	// Retrieve data of batches to process
    let rsBatches = Ax.db.executeQuery(`
        <select>
            <columns>
                *
            </columns>
            <from table='pos_future_prices_head' />
            <where>
                    future_status = 1
                AND future_date   = TODAY
            </where>
        </select>
    `);

    // Iterate different batches, retrieve items
    for (let rowBatch of rsBatches) {

        let rsItems = Ax.db.executeQuery(`
            <select>
                <columns>
                    pos_future_prices_item.product_id,
                    pos_future_prices_item.rel_id,
                    pos_future_prices_item.future_price
                </columns>
                <from table='pos_future_prices_item' />
                <where>
                    future_cabid = ?
                </where>
            </select>
        `, rowBatch.future_cabid);

        // Update combinations price
        for (let rowItem of rsItems) {
            Ax.db.update("pos_product_combinations", 
                {product_price_retail : rowItem.future_price}, 
                {rel_id     : rowItem.rel_id,
                 product_id : rowItem.product_id
                });
        }

        // Update header status
        Ax.db.update("pos_future_prices_head", {
                      future_status : 2,
                      future_errmsg : null
                    }, {
                      future_cabid : rowBatch.future_cabid
                    });

        console.log(rowBatch.future_cabid);
    }
}
 
