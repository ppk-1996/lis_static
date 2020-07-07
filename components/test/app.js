function runTest(id, name, test_name, type) {
  $("#runTestModelLabel").html("Run Test");
  $("#orderID").val(id);
  $("#patientName").val(name);
  $("#runTestName").val(test_name);
  $("#runTestType").val(type);
  $("result").val("");
  $(".form-check-input").prop("checked", false);
}
function rerunTest(id, name, test_name, type, result) {
  $("#runTestModelLabel").html("Rerun Test");
  $("#orderID").val(id);
  $("#patientName").val(name);
  $("#runTestName").val(test_name);
  $("#runTestType").val(type);
  $("#result").val(result);

  $("#1").prop("checked", true);
}
$(document).ready(function () {
  var trt = $("#testrecordtable").DataTable({
    order: [[0, "desc"]],
    data: testRecordDemo,

    columns: [
      { data: "id" },
      { data: "order_id" },
      { data: "urgency" },
      { data: "patient_name" },
      { data: "test_name" },
      { data: "test_type" },
      { data: "sample_ids" },
      { data: "user_name" },
      { data: "date_time" },
      {
        data: "status",
        render: function (data, type, row) {
          return `${
            data == "Pending"
              ? "<strong style='color:red'>" + data + "</strong>"
              : data
          }`;
        },
      },
      { data: "result" },

      {
        data: null,
        render: function (data, type, row) {
          if (row.status == "Completed") {
            return `
            <button type="button" class="btn btn-info btn-sm"   data-toggle="modal"
            data-target="#runTestModal" onclick="rerunTest(${row.order_id},'${row.patient_name}','${row.test_name}','${row.test_type}','${row.result}')"> Rerun Test</button>
            `;
          }
          return `
            <button type="button" class="btn btn-success btn-sm"   data-toggle="modal"
            data-target="#runTestModal" onclick="runTest(${row.order_id},'${row.patient_name}','${row.test_name}','${row.test_type}')"> Run Test</button>
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
      { responsivePriority: 1, targets: -1 },
      { responsivePriority: 2, targets: -3 },
    ],
  });

  var tt = $("#testtable").DataTable({
    bInfo: false,
    pageLength: 5,
    lengthMenu: [5, 10],
    data: testDemo,
    columns: [
      { data: "id" },
      { data: "name" },
      { data: "type" },
      { data: "price" },
    ],
  });

  $("#addTest").on("click", function () {
    var newID = testDemo[testDemo.length - 1].id + 1;
    var newRow = {
      id: newID,
      name: $("#testName").val(),
      type: $("#testType").val(),
      price: $("#testPrice").val(),
    };

    var rowNode = tt.row.add(newRow).draw().node();
    $(rowNode).css("color", "red");
    newID++;
    $("#testName").val("");
    $("#testType").val("");
    $("#testPrice").val("");
  });

  $("#uploadResult").on("click", function () {
    $("#success").prop("hidden", false);
    setTimeout(function () {
      $("#success").prop("hidden", true);
    }, 2000);
  });
});
