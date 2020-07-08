$(document).ready(function () {
  var ut = $("#usertable").DataTable({
    order: [[0, "desc"]],
    data: userDemo,

    columns: [
      { data: "id" },
      { data: "name" },
      { data: "email" },
      { data: "password" },
      { data: "role" },
      { data: "phone" },

      {
        data: null,
        render: function (data, type, row) {
          return `
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

  var newID = userDemo[userDemo.length - 1].id + 1;
  $("#submitUser").on("click", function () {
    var newRow = {
      id: newID,
      name: $("#name").val(),
      email: $("#email").val(),
      password: $("#password").val(),
      role: $("#role").val(),
      phone: $("#phone").val(),
    };
    var rowNode = ut.row.add(newRow).draw().node();
    $(rowNode).css("color", "red");
    newID++;
  });
});
