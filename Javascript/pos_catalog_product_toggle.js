// ----------------------------------------------------------- //
//        pos_catalog_product_toggle                           //
//                                                             //
// Process call to add or remove products on catalog           //
//                                                             // 
// ----------------------------------------------------------- //
function pos_catalog_product_toggle(product_id, catalog_code){
    
    
    let m_has_catalog = Ax.db.executeGet(`
        <select>
            <columns>
                COUNT(*)
            </columns>
            <from table='pos_catalog_products'/>
            <where>
                product_id = ? AND
                catalog_code = ?
            </where>
        </select>
    `,product_id, catalog_code);
    
    //Tag exists
    if(m_has_catalog != 0){
       Ax.db.delete('pos_catalog_products', 
			{product_id   :   product_id,
			 catalog_code :   catalog_code});
       
    // Tag don't exists   
    }else{
        Ax.db.insert('pos_catalog_products', {
            product_id    : product_id,
            catalog_code  : catalog_code});
    }
    return true;
}    