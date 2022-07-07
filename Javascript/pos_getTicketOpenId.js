
/**
 *  Copyright (c) 1988-2020 deister software, All Rights Reserved.
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
 *  FUNCTION JS: pos_getTicketOpenId()
 *
 *  Version:       V1.0
 *  Date:          8th February 2021
 *  Description:
 *  get the ticketId of the opened ticket
 *  
 */
 function pos_getTicketOpenId(employee_id) {

    const userCode = Ax.ext.user.get().getCode();

    return Ax.db.executeGet(`
        <select>
            <columns>
                pos_ticketh_open.ticket_id
            </columns>
            <from table="pos_ticketh_open">
            	<join table='pos_store'>
            		<on>pos_ticketh_open.store_code = pos_store.store_code</on>
            		<join table='pos_terminal'>
            			<on>pos_store.store_code = pos_terminal.store_code</on>
            		</join>
            	</join>
                <join table='pos_employee'>
                    <on>pos_employee.employee_id = ?</on>
                </join>
            </from>
            <where>
                pos_ticketh_open.ticket_state = 0 AND
                pos_ticketh_open.employee_id = pos_employee.employee_id AND
                pos_terminal.user_code = ?
            </where>
        </select>
    `, employee_id, userCode);
}