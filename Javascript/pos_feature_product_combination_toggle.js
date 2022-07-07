function pos_feature_product_combination_toggle(product_combination_id, featureId, valueId){
    
    let count = Ax.db.executeGet(`SELECT COUNT(*) 
                                    FROM pos_product_combinations_features
                                   WHERE product_combination_id = ?
                                     AND feature_id = ? 
                                     AND value_id   = ?`, product_combination_id, featureId, valueId);
                                     

    if (count == 0){
        Ax.db.insert('pos_product_combinations_features', {
            product_combination_id : product_combination_id,
            feature_id : featureId,
            value_id   : valueId
        })
    } else {
        
        Ax.db.delete('pos_product_combinations_features', {
            product_combination_id : product_combination_id,
            feature_id : featureId,
            value_id   : valueId
        });
        
    }
}