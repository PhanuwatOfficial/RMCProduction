

async function renderTable() {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  const q = query(usersCollection, orderBy("createdAt", "asc"));
  const querySnapshot = await getDocs(q);

  let index = 1;
  querySnapshot.forEach((doc) => {
    const userData = doc.data();
    const row = document.createElement("tr");

    row.innerHTML = `
<td>${index++}</td>
<td>${userData.department}</td>
<td>${userData.line}</td>
<td>${userData.orderNumber}</td>
<td>${userData.productCode}</td>
<td>${userData.productName}</td>
<td>${userData.productUnit}</td>
<td>${userData.productQuantity}</td>
<td>${userData.requestedDate}</td>
<td>${userData.productionDate}</td>
<td>${userData.producedQuantity}</td>
<td>${userData.finishDate}</td>
<td style="color: ${productionStatusColor}; font-weight: bold;">${userData.productionStatus}</td>
<td>
<button onclick="editUser('${doc.id}', '${userData.department}', '${userData.line}', '${userData.orderNumber}', '${userData.productCode}', '${userData.productName}', '${userData.productUnit}', '${userData.productQuantity}', '${userData.requestedDate}', '${userData.productionDate}', '${userData.producedQuantity}', '${userData.finishDate}', '${userData.productionStatus}')" style="background-color: #1270c7; display: none;">แก้ไข</button>
<button onclick="deleteUser('${doc.id}')"style="background-color: red; display: none;">ลบ</button>
<button onclick="showHistory('${doc.id}')" style="background-color: rgb(223, 159, 40);">ประวัติ</button>
</td>
`;


    tableBody.appendChild(row);
  });
}


<div class="DepartmentAndLine">
<label for="filterDepartment">แผนก :</label>
<select id="filterDepartment" onchange="filterByDateAndDepartment()">
  <option value="All">ALL</option>
  <option value="ปิดผิว">ปิดผิว (LM)</option>
  <option value="พีพีบอร์ด">พีพีบอร์ด (PPB)</option>
  <option value="รีดเหล็ก">รีดเหล็ก (FM)</option>
  <option value="พิมพ์เยื่อ">พิมพ์เยื่อ (TLP)</option>
  <option value="เฟรม">เฟรม (WP)</option>
  <option value="ตัดแผ่น">ตัดแผ่น (PPBC)</option>
</select>

<label for="filterLine">ไลน์ :</label>
        <select id="filterLine" onchange="filterByDateAndDepartment()">
          <option value=""></option>
        </select>
      </div>

ตรวจสอบ ${userData.department} ในตาราง id = tableBody ว่าตรงกับใน dropdown ไหม ถ้าตรง ให้แสดงตาราง id = tableBody เฉพาะที่ตรงกับ dropdown 
เช่น เลือก dropdown = "พีพีบอร์ด" ให้ตรวจสอบในตารางค่า ${userData.department} แล้วแสดงตารางเฉพาะที่ค่า ${userData.department} = "พีพีบอร์ด" ให้แผนกที่ filter ตรงกับที่แสดงในตาราง

//ถ้าเราเลือก option value = "พีพีบอร์ด" ให้ทำการแสดง table id = tableBody ที่ userData.department = พีพีบอร์ดเท่านั้น//</div>
//เมื่อเลือก dropdown ปิดผิว ในตาราง tableBody ให้แสดงตารางเฉพาะที่ department text = ปิดผิว


// filter department - fixed
// filter line - fixed
// ตอนนี้ยังเป็นเมื่อ login user1 แล้ว เข้าแผนกปิดผิว แต่แสดงแค่ L1 - fixed
// เมื่อเลือกแผนกแล้ว เปลี่่ยนแผนก ยังทำการจำไลน์เดิมที่เลือกอยู่ -fixed

// filter start date and end date -fixed

// search  - fixed
// ในช่อง input เมื่อกรอก แล้วให้ตรวจสอบคำที่พิมพ์ลงไปใน input ว่าตรงกันกับ ${userData.productName} ที่อยู่ในตาราง id = tableBody ไหม ถ้าตรงกันให้แสดงตารางแค่ที่ตรงกับที่พิมพ์ไปใน input
// Modal เมื่อเลือกแผนก แล้วเลือกไลน์ ให้ option มีไลน์ตามแผนกนั้นๆ - fixed

function searchProductName() {
  // Reset the filter dropdown to "ALL"
  // document.getElementById("filterDepartment").value = "All";

  // Get the search input and convert it to lowercase
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const table = document.getElementById("productionTable");
  const rows = table.getElementsByTagName("tr"); // Get all the rows in the table

  // Loop through all the rows in the table body
  for (let i = 1; i < rows.length; i++) {
    // Get the productName from the current row (adjust the index to match your productName column)
    const productName = rows[i].cells[5].innerText.toLowerCase(); // Assuming productName is in the 5th column

    // If the productName includes the search input, show the row; otherwise, hide it
    if (productName.includes(searchInput)) {
      rows[i].style.display = ""; // Show the row
    } else {
      rows[i].style.display = "none"; // Hide the row
    }
  }
}

// login restrict - fixed
// color status production -fixed
// block edit  - fixed
// hide edit and delete button 
// when login admin and planning1 , 2 user add "เพิ่มแผน" button - fixed
// edit history modal - fixed

// bugs เมื่อลบข้อมูลแล้ว ปุ่มถูกรีเฟรช เหลือแค่ประวัติ ทั้งๆที่ login อยู่ 
// แก้ไขให้เมื่อ login อยู่แล้วเมื่อลบข้อมูล ไม่ต้องทำการซ่อนปุ่มแก้ไขกับลบ (hideEditAndDeleteButtons)

// เมื่อ login user1-6, qc1-2, wh1-2 ให้ทำการซ่อนปุ่ม "เพิ่มแผน "addRowButton - fixed
// function filterRows เมื่อ login ด้วย user ต่างๆ ให้แสดงข้อมูลในตารางที่ต่างกัน - fixed
// sort finishdate when click finishDateHeader

// เมื่อกดลบ row ในตารางแล้ว usernamedisplay หาย - fixed

// แก้ไข เมื่อเข้า user = user อื่นๆ แล้วเข้า user = admin แล้วกดเพิ่มแผนแล้ว inputs ถูก block ตาม user = user อื่นๆนั้น - fixed
//td(16) 286.92*51  - 1 px
      //286.03*69 -10 px

//bug เมื่อกดแก้ไข แล้ววันที่บันทึก แสดงเวลา ณ ขณะนั้น แทนที่เวลาที่บันทึก



จากโค้ดนี้

const department = document.getElementById("department").value;
        const line = document.getElementById("line").value;
        const orderNumber = document.getElementById("orderNumber").value;
        const productCode = document.getElementById("productCode").value;
        const productName = document.getElementById("productName").value;
        const productUnit = document.getElementById("productUnit").value;
        const productQuantity =
          document.getElementById("productQuantity").value;
        const requestedDate = document.getElementById("requestedDate").value;
        const productionDate = document.getElementById("productionDate").value;
        const producedQuantity = document.getElementById("producedQuantity").value;
        const finishDate = document.getElementById("finishDate").value;
        const productionStatus = document.getElementById("productionStatus").value;
        const recordDate = document.getElementById("recordDate").value;
        const productionTime = document.getElementById("productionTime").value;
        const createdAt = new Date();

        if (editIndex) {
          const userDoc = doc(db, "products3", editIndex);
          await updateDoc(userDoc, {
            department,
            line,
            orderNumber,
            productCode,
            productName,
            productUnit,
            productQuantity,
            requestedDate,
            productionDate,
            producedQuantity,
            finishDate,
            productionStatus,
            recordDate,
            productionTime,
            

          });
          editIndex = null;
        } else {
          await addDoc(usersCollection, {
            department,
            line,
            orderNumber,
            productCode,
            productName,
            productUnit,
            productQuantity,
            requestedDate,
            productionDate,
            producedQuantity,
            finishDate,
            productionStatus,
            recordDate,
            productionTime,
            createdAt,

          });
        }

        document.getElementById("userForm").reset();
        renderTable();
        document.getElementById("myModal").style.display = "none";
        setDefaultRecordDate();
      });

    window.editUser = (
      id,
      department,
      line,
      orderNumber,
      productCode,
      productName,
      productUnit,
      productQuantity,
      requestedDate,
      productionDate,
      producedQuantity,
      finishDate
    ) => {
      document.getElementById("department").value = department;
      document.getElementById("line").value = line;
      document.getElementById("orderNumber").value = orderNumber;
      document.getElementById("productCode").value = productCode;
      document.getElementById("productName").value = productName;
      document.getElementById("productUnit").value = productUnit;
      document.getElementById("productQuantity").value = productQuantity;
      document.getElementById("requestedDate").value = requestedDate;
      document.getElementById("productionDate").value = productionDate;
      document.getElementById("producedQuantity").value = producedQuantity;
      document.getElementById("finishDate").value = finishDate;
      document.getElementById("productionStatus").value = productionStatus;
      document.getElementById("recordDate").value = recordDate;
      document.getElementById("productionTime").value = productionTime;
      editIndex = id;
      document.getElementById("myModal").style.display = "block";
      updateModalLineDropdown();
    };

    window.deleteUser = async (id) => {
      const userDoc = doc(db, "products3", id);
      await deleteDoc(userDoc);
      renderTable();


    };

    window.showHistory = async (id) => {
        const userDoc = doc(db, "products3", id);
        const docSnapshot = await getDoc(userDoc);

        if (docSnapshot.exists()) {
          const history = docSnapshot.data().history || [];
          const historyDetails = document.getElementById("historyDetails");
          historyDetails.innerHTML = ""; // Clear old history details

          // Create a list of history items
          history.forEach(entry => {
            const entryEl = document.createElement("div");
            entryEl.textContent = `Name: ${entry.productName}, Age: ${entry.age}, Weight: ${entry.weight}, Sex: ${entry.sex}, Date: ${entry.date}, Time: ${entry.time}`;
            historyDetails.appendChild(entryEl);
          });

          document.getElementById("historyModal").style.display = "flex"; // Show history modal
        }
      };


      เปลี่ยนทำให้เป็นฟอร์มแบบนี้


      const name = document.getElementById("name").value;
          const age = document.getElementById("age").value;
          const weight = document.getElementById("weight").value;
          const sex = document.getElementById("sex").value; // Get value for sex
          const { date, time } = getCurrentDateAndTime();

          if (editIndex) {
            // Update existing data
            const userDoc = doc(db, "products5", editIndex);
            await updateDoc(userDoc, {
              name,
              age,
              weight,
              sex, // Update the sex field
              history: arrayUnion({ name, age, weight, sex, date, time }), // Log edit history
            });
            editIndex = null;
          } else {
            // Add new data
            await addDoc(usersCollection, {
              name,
              age,
              weight,
              sex, // Add the sex field
              createdAt: new Date(), // Add createdAt timestamp
              history: [{ name, age, weight, sex, date, time }], // Log creation history
            });
          }

          document.getElementById("userForm").reset(); // Reset form after submission
          renderTable(); // Update the table
          document.getElementById("dataModal").style.display = "none"; // Close modal after submission
        });

      // Edit user data
      window.editUser = (id, name, age, weight, sex) => {
        document.getElementById("name").value = name;
        document.getElementById("age").value = age;
        document.getElementById("weight").value = weight;
        document.getElementById("sex").value = sex; // Set sex for editing
        editIndex = id; // Store ID for editing
        document.getElementById("dataModal").style.display = "flex"; // Show modal for editing
      };

      // Delete user data
      window.deleteUser = async (id) => {
        const userDoc = doc(db, "products5", id);
        await deleteDoc(userDoc); // Delete the document
        renderTable(); // Refresh the table
      };

      // Show user history
      window.showHistory = async (id) => {
        const userDoc = doc(db, "products5", id);
        const docSnapshot = await getDoc(userDoc);

        if (docSnapshot.exists()) {
          const history = docSnapshot.data().history || [];
          const historyDetails = document.getElementById("historyDetails");
          historyDetails.innerHTML = ""; // Clear old history details

          // Create a list of history items
          history.forEach(entry => {
            const entryEl = document.createElement("div");
            entryEl.textContent = `Name: ${entry.name}, Age: ${entry.age}, Weight: ${entry.weight}, Sex: ${entry.sex}, Date: ${entry.date}, Time: ${entry.time}`;
            historyDetails.appendChild(entryEl);
          });

          document.getElementById("historyModal").style.display = "flex"; // Show history modal
        }
      };