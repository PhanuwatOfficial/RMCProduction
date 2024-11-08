
BUGS



PROMPT


FINISHED

// เมื่อ login ด้วย user ไหน ให้กำหนด statusProduction ที่จะแสดงให้กับ user นั้น - fixed

// แก้ไขเมื่อกด edit modal แล้วไปกด add plan แล้ว กลายเป็น edit modal ที่กดก่อนหน้า แทนการ add plan ใหม่ - fixed

// setDefualtRecordDate ทำงานไม่ปกติ -fixed
    //เพิ่มแผนแล้ว record date ขึ้นปกติ แต่พอกดดู ที่ edit button แล้ว record date ไม่ขึ้น 

// edit block input ไม่ปกติ - fixed

// fetch autofillData สลับ productName กับ productCode - fixed

// validate input modal for each user - fixed

//เพิ่ม ฟังก์ชันจำกัดปุ่มแก้ไข ตาม department - fixed

// เตือนเมื่อกรอกข้อมูลใน input ไม่ครบ - fixed

// ถ้า user1 เข้าให้แก้ไขแผนก "ปิดผิว" ได้ แต่ถ้า user อื่นเข้า จะแก้ไขไม่ได้ - fixed

// hide delete button username != admin & planning1-2 - fixed

// แก้ไขให้เมื่อ login อยู่แล้วเมื่อลบข้อมูล หรือ เพิ่มแผน ไม่ต้องทำการซ่อนปุ่มแก้ไขกับลบ (hideEditAndDeleteButtons) - เมื่อลบข้อมูลแล้ว ปุ่มถูกรีเฟรช เหลือแค่ประวัติ ทั้งๆที่ login อยู่  - fixed

// ให้แยก productionStatus ของแต่ละ LoggedInDepartment - fixed

// กำหนดขนาดตารางให้เหมือนเก่า - fixed

ON PROCESS

- TITLE

// sort finishdate when click finishDateHeader

- DETAILS



- PROMPT

เมื่อคลิก productionDateHeader ที่อยู่ใน  <th id="productionDateHeader">วันที่ผลิตสินค้า</th> แล้ว ให้ทำการเรียงลำดับวันที่ userData.productionDate ในตาราง id = tableBody จากน้อยไปมาก เมื่อคลิกอีกที ให้มากไปน้อย
