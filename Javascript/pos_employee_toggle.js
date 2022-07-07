function pos_employee_toggle(employee_id, store_code){
    
        
        
    let has_employee = Ax.db.executeGet(`
        <select>
            <columns>
                COUNT(*)
            </columns>
            <from table='pos_employee_stores'/>
            <where>
                employee_id = ? AND
                store_code = ?
            </where>
        </select>
    `,employee_id, store_code);
        
        //Tag exists
        if(has_employee != 0){
           Ax.db.delete('pos_employee_stores', 
    			{employee_id  :   employee_id,
    			 store_code   :   store_code});
           
        // Tag don't exists   
        }else{
            Ax.db.insert('pos_employee_stores',
                {employee_id  :   employee_id,
    			 store_code   :   store_code});
        }
        return true;
    
    
}