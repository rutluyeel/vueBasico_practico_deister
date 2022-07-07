function pos_feature_product_toggle(productId, featureId, valueId){
    
    let count = Ax.db.executeGet(`SELECT COUNT(*) 
                                    FROM pos_product_features
                                   WHERE product_id = ?
                                     AND feature_id = ? 
                                     AND value_id   = ?`, productId, featureId, valueId);
                                     

    if (count == 0){
        Ax.db.insert('pos_product_features', {
            product_id : productId,
            feature_id : featureId,
            value_id   : valueId
        })
    } else {
        
        Ax.db.delete('pos_product_features', {
            product_id : productId,
            feature_id : featureId,
            value_id   : valueId
        });
        
    }
    
    
    
}