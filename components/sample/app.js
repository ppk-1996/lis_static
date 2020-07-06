function dispatchSample(id) {
  $("#" + id).html("Dispatched");
}

$(document).ready(function () {
  $("#sampletable").DataTable({
    data: sampleDemo,
    columns: [
      { data: "id" },
      { data: "order_id", width: "10%" },
      { data: "patient_name", width: "10%" },
      {
        data: "type",
        render: function (data, type, row) {
          if (data == "Urine") {
            return `<img src="./img/urine.png" height="16px">${data}`;
          }
          return `<img src="./img/blood.png" height="16px">${data}`;
        },
      },
      { data: "collector" },
      {
        data: "status",
        render: function (data, type, row) {
          return `<strong id='${row.id}'>${data}</strong>`;
        },
      },
      { data: "additive" },
      { data: "container" },
      { data: "volume" },
      { data: "date" },
      {
        data: "status",
        render: function (data, type, row) {
          if (data == "Dispatched" || data == "Tested") {
            return ` 
            <button type="button" class="btn btn-warning btn-sm"> Edit</button>
            <button type="button" class="btn btn-danger btn-sm"> Delete</button>       
            `;
          }
          return ` 
          <button  type="button" class="btn btn-success btn-sm" onclick=" $(this).hide();dispatchSample(${row.id})"> Dispatch</button>
            <button type="button" class="btn btn-warning btn-sm"> Edit</button>
            <button type="button" class="btn btn-danger btn-sm"> Delete</button>       
            `;
        },
      },
    ],
    autowidth: "Blood",
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
            return "Sample Detail";
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
