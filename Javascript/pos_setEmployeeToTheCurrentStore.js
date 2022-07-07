
/**
 *  Copyright (c) 1988-2021 deister software, All Rights Reserved.
 *
 *  All information contained herein is, and remains the property of deister software.
 *  The intellectual and technical concepts contained herein are proprietary to
 *  deister software and may be covered by trade secret or copyright law.
 *  Dissemination of this information or reproduction of this material is strictly
 *  forbidden unless prior written permission is obtained from deister software.
 *  Access to the source code contained herein is hereby forbidden to anyone except
 *  current deister software employees, managers or contractors who have executed
 * "Confidentiality and Non-disclosure" agreements explicitly covering such access.
 *  The copyright notice above does not evidence any actual or intended publication
 *  for disclosure of this source code, which includes information that is confidential
 *  and/or proprietary, and is a trade secret, of deister software
 *
 *  ANY REPRODUCTION, MODIFICATION, DISTRIBUTION, PUBLIC  PERFORMANCE,
 *  OR PUBLIC DISPLAY OF OR THROUGH USE  OF THIS  SOURCE CODE  WITHOUT THE
 *  EXPRESS WRITTEN CONSENT OF COMPANY IS STRICTLY PROHIBITED, AND IN VIOLATION
 *  OF APPLICABLE LAWS AND INTERNATIONAL TREATIES.THE RECEIPT OR POSSESSION OF
 *  THIS SOURCE CODE AND/OR RELATED INFORMATION DOES NOT CONVEY OR IMPLY ANY
 *  RIGHTS TO REPRODUCE, DISCLOSE OR DISTRIBUTE ITS CONTENTS, OR TO MANUFACTURE,
 *  USE, OR SELL ANYTHING THAT IT MAY DESCRIBE, IN WHOLE OR IN PART.
 *
 *
 * -----------------------------------------------------------------------------
 *
 *  FUNCTION JS: pos_setEmployeeToTheCurrentStore()
 *
 *  Version:       V1.0
 *  Date:          19th Marc 2021
 *  Description:
 *  set an employee as a user of the current store
 *  
 */
 function pos_setEmployeeToTheCurrentStore(employee_id) {

    //Get the current store
    const userCode = Ax.ext.user.get().getCode();
    
    const store = Ax.db.executeGet(`
        <select>
            <columns>
                pos_terminal.store_code
            </columns>
            <from table="pos_terminal"></from>
            <where>
                pos_terminal.user_code = ?
            </where>
        </select>
    `, userCode)
    
    
    /**
     * check if the employee is already in the selected store
     * If so return like we has just added.
     */
    const count = Ax.db.executeGet(`
        <select>
            <columns>
                COUNT(*)
            </columns>
            <from table="pos_employee_stores"></from>
            <where>
                pos_employee_stores.employee_id = ? AND
                pos_employee_stores.store_code = ?
            </where>
        </select>
    `, employee_id, store);
    
    if (count == 0) {
        //Create the relatin between the employee and the store
        Ax.db.insert("pos_employee_stores", {
            employee_id: employee_id,
            store_code: store
        })
    }
}