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
 *  FUNCTION JS: pos_employee_start_timer(employee_id)
 *
 *  Version:       V1.0
 *  Date:          15th December 2021
 *  Description:
 *  get start timer by employe
 *  
 */
 function pos_employee_start_timer(employee_id){
    
    const userCode = Ax.ext.user.get().getCode();
    //obtain store info filtering by user
    const store_info = Ax.db.executeQuery(`SELECT pos_terminal.terminal_id, pos_terminal.store_code 
                                             FROM pos_terminal 
                                            WHERE pos_terminal.user_code = ?`, userCode).toOne();
    // obtain cur_acc_id filtering by user and store code
    const curr_acc_id = Ax.db.executeGet(`SELECT acc_id 
                                            FROM pos_employee_access_control, pos_terminal, pos_store
                                           WHERE pos_terminal.terminal_id = pos_employee_access_control.terminal_id 
                                             AND pos_store.store_code = ?
                                             AND pos_employee_access_control.employee_id = ? AND acc_time_end IS NULL`, store_info.store_code, employee_id);
    X
    // check if curr_acc_id is different from null or undefined
    if(!curr_acc_id){
        Ax.db.insert('pos_employee_access_control', {
            employee_id : employee_id,
            terminal_id : store_info.terminal_id,
            acc_time_ini : new Date(),
        });
    }
}