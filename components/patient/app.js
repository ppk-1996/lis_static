$(document).ready(function () {
  var pt = $("#patienttable").DataTable({
    order: [[0, "desc"]],
    data: patientDemo,
    columns: [
      { data: "id" },
      { data: "name" },
      { data: "nrc" },
      { data: "dob" },
      { data: "age" },
      { data: "blood_type" },
      { data: "gender" },
      { data: "height" },
      { data: "weight" },
      { data: "marital_status" },
      { data: "referral" },
      { data: "phone" },
      { data: "address" },
      { data: "reg_date" },
      { data: "reg_time" },
      {
        data: "name",
        render: function (data, type, row) {
          return `
            <a href="../order/index.html" class="btn btn-success btn-sm" >Orders</a>
            <button type="button" class="btn btn-warning btn-sm"> Edit</button>
            <button type="button" class="btn btn-danger btn-sm" onclick="$(this).parent().parent().hide()"> Delete</button>
            `;
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
          header: function (row) {
            var data = row.data();
            return "Patient Detail";
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
    ],
  });

  var newID = patientDemo[patientDemo.length - 1].id + 1;
  $("#submitPatient").on("click", function () {
    var newRow = {
      id: newID,
      name: $("#name").val(),
      nrc: $("#nrc").val(),
      dob: $("#dob").val(),
      age: $("#age").val(),
      blood_type: $("#blood_type").val(),
      gender: $("#gender").val(),
      height: $("#height").val(),
      weight: $("#weight").val(),
      marital_status: $("#marital").val(),
      referral: $("#referral").val(),
      phone: $("#phone").val(),
      address: $("#address").val(),
      reg_date: $("#reg_date").val(),
      reg_time: $("#reg_time").val(),
    };
    var rowNode = pt.row.add(newRow).draw().node();
    $(rowNode).css("color", "red");
    newID++;
  });
});
