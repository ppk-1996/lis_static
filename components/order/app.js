function selectPatient(id, name) {
  $("#patient_id").val(id);
  $("#patient_name").val(name);
}
var tests = [];
var totalTests = 0;
var totalPrice = 0;
var totalAmount = 0;
function handleCheckbox(checkbox, name, price) {
  if (checkbox.checked == true) {
    tests.push(name);
    totalTests++;
    totalPrice += price;
  } else {
    totalTests--;
    totalPrice -= price;
  }
  $("#totalTests").val(totalTests);
  $("#price").val(totalPrice);
  if (totalPrice > 0) {
    $("#commission").removeAttr("disabled");
  } else {
    $("#commission").prop("disabled", true);
  }
}
function calculateTotalAmount() {
  totalAmount = parseFloat($("#commission").val()) + totalPrice;
  $("#totalAmount").val(totalAmount);
}

$(document).ready(function () {
  var ot = $("#ordertable").DataTable({
    order: [[0, "desc"]],
    data: orderDemo,
    columns: [
      { data: "order_id" },
      { data: "patient_name" },
      { data: "balance" },
      { data: "level" },
      { data: "tat" },
      { data: "tests" },
      { data: "dateTime" },
      { data: "status" },
      {
        data: "status",
        render: function (data, type, row) {
          if (data == "Completed") {
            return `
            <a target="_blank" href="https://invoicetemplates.com/wp-content/uploads/medical-bill-invoice-template.pdf" type="button" class="btn btn-success btn-sm"> Invoice</a>
          
            <a target="_blank" href="https://www.reportss.org/wp-content/uploads/2012/10/Test-Report-Template.docx" type="button" class="btn btn-info btn-sm"> Test Results</a>
            
            <button type="button" class="btn btn-warning btn-sm" onclick="$(this).html('Paid').removeClass('btn-warning').addClass('btn-secondary');"> Pay Now</button>
          
            <button type="button" class="btn btn-danger btn-sm" onclick="$('#${row.order_id}').html('Cancelled')" > Cancel</button>
            `;
          } else {
            return `
            <a target="_blank" href="https://invoicetemplates.com/wp-content/uploads/medical-bill-invoice-template.pdf" type="button" class="btn btn-success btn-sm"> Invoice</a>
                     
            <button type="button" class="btn btn-warning btn-sm" onclick="$(this).html('Paid').removeClass('btn-warning').addClass('btn-secondary');"> Pay Now</button>
          
            <button type="button" class="btn btn-danger btn-sm" onclick="$('#${row.order_id}').html('Cancelled')" > Cancel</button>
            `;
          }
        },
      },
    ],

    responsive: {
      breakpoints: [
        { name: "bigdesktop", width: Infinity },
        { name: "meddesktop", width: 1480 },
        { name: "smalldesktop", width: 1280 },
        { name: "medium", width: 1188 },
        { name: "tabletl", width: 1024 },
        { name: "btwtabllandp", width: 848 },
        { name: "tabletp", width: 768 },
        { name: "mobilel", width: 480 },
        { name: "mobilep", width: 320 },
      ],
      details: {
        display: $.fn.dataTable.Responsive.display.modal({
          header: function () {
            return "Order Detail";
          },
        }),
        renderer: $.fn.dataTable.Responsive.renderer.tableAll({
          tableClass: "table",
        }),
      },
    },
    columnDefs: [
      { responsivePriority: 1, targets: 0 },
      { responsivePriority: 2, targets: -1 },
      { responsivePriority: 3, targets: -2 },
      { responsivePriority: 4, targets: -6 },
    ],
  });

  $("#submitOrder").on("click", function () {
    var newID = orderDemo[orderDemo.length - 1].order_id + 1;
    var newRow = {
      order_id: newID,
      patient_name: $("#patient_name").val(),
      balance: $("#totalAmount").val(),

      level: $("#urgency").val(),
      status: "Unfufilled",
      tat: "00:60",
      tests: tests.join(", "),
      dateTime: "2018-10-23 21:49:21",
    };
    var rowNode = ot.row.add(newRow).draw().node();
    $(rowNode).css("color", "red");
    newID++;
  });

  $("#patientdatatable").DataTable({
    bInfo: false,
    pageLength: 1,
    lengthMenu: [1, 5, 10],
    order: [[0, "desc"]],
    data: patientDemo,
    columns: [
      { data: "id" },
      { data: "name" },
      { data: "nrc" },
      { data: "dob" },
      {
        data: null,
        render: function (data, type, row) {
          let a = row.id;
          let b = row.name;
          return `<button type="button" class="btn btn-sm btn-success" onclick="selectPatient(${a},'${b}')">Select Patient</button>`;
        },
      },
    ],
  });

  $("#testdatatable").DataTable({
    data: testDemo,
    columns: [
      { data: "id" },
      { data: "name" },
      { data: "type" },
      { data: "price" },
      {
        data: "name",
        render: function (data, type, row) {
          return `<input style="transform: scale(1.5);" type="checkbox" name="" value="${data}" onchange="handleCheckbox(this,'${data}',${row.price})">`;
        },
      },
    ],
  });
});
