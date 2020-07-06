$(document).ready(function () {
  $("#patienttable").DataTable({
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
        data: null,
        render: function (data, type, row) {
          return `
            <button type="button" class="btn btn-success btn-sm"> Orders</button>
            <button type="button" class="btn btn-info btn-sm"> Records</button>
            <button type="button" class="btn btn-warning btn-sm"> Edit</button>
            <button type="button" class="btn btn-danger btn-sm"> Delete</button>
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
});
