$(document).ready(function () {
  $("#mydatatable").DataTable({
    data: dataDemo,
    columns: [
      { data: "order_id" },
      { data: "patient_name" },
      { data: "balance" },
      { data: "lab" },
      { data: "level" },
      { data: "status" },
      { data: "tat" },
      { data: "tests" },
      { data: "dateTime" },
      {
        data: null,
        render: function (data, type, row) {
          return `
            <button type="button" class="btn btn-success btn-sm"> Invoice</button>
            <button type="button" class="btn btn-info btn-sm"> Pay</button>
            <button type="button" class="btn btn-warning btn-sm"> Edit</button>
            <button type="button" class="btn btn-danger btn-sm"> Cancel</button>
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
      { responsivePriority: 3, targets: -2 },
      { responsivePriority: 4, targets: -6 },
    ],
  });

  $("#patientdatatable").DataTable();
});
var dataDemo = [
  {
    order_id: 1,
    patient_name: "Chelsie",
    balance: "4977737725",
    lab: "12/6/2019",
    level: 43,
    status: "UZ",
    tat: "F",
    tests: 4,
    dateTime: 155,
  },
];
/* Order ID:	1
Patient Name:	Chelsie
Balance:	4977737725
Lab:	12/6/2019
Level:	43
TAT:	UZ
Tests:	F
Date Time:	4
Status:*/
