// ----------------------------------------------------------- //
//        pos_product_tags_toggle                              //
//                                                             //
// Process call to add or remove tags on products              //
//                                                             // 
// ----------------------------------------------------------- //
function pos_product_tags_toggle(product_id, tag_id){
    
    
    let m_has_tag = Ax.db.executeGet(`
        <select>
            <columns>
                COUNT(*)
            </columns>
            <from table='pos_product_tags'/>
            <where>
                product_id = ? AND
                tag_id = ?
            </where>
        </select>
    `,product_id, tag_id);
    
    //Tag exists
    if(m_has_tag != 0){
       Ax.db.delete('pos_product_tags', 
			{product_id :   product_id,
			 tag_id     :   tag_id});
       
    // Tag don't exists   
    }else{
        Ax.db.insert('pos_product_tags', {
            product_id  : product_id,
            tag_id      : tag_id});
    }
    return true;
}    