$(document).ready(() => {

    //let testi = $("#testi");

    let table = $("#machining_parameter_sets_table").DataTable({
        ajax: {
            type: "GET",
            datatype: "json",
            url: "/machining-parameter-sets",
            dataSrc: ""
        },
        rowId: "_id",
        columns: [{
                data: "_id",
                type: "readonly",
                visible: false
            },
            {
                data: "tool_name",
                type: "text",
                required: true
            },
            {
                data: "material",
                type: "text",
                required: true
            },
            {
                data: "cutting_speed",
                type: "float",
                required: true
            },
            {
                data: "feed_rate",
                type: "float",
                required: true
            }
        ],
        dom: "Bfrtip",
        select: "single",
        responsive: true,
        altEditor: true,
        buttons: [
            "columnsToggle",
            {
                text: "Create",
                name: "add"
            },
            {
                text: "Edit",
                name: "edit"
            },
            {
                text: "Delete",
                name: "delete"
            },
            {
                text: "Refresh",
                name: "refresh"
            }
        ],
        onAddRow: (datatable, rowdata, success, error) => {
            $.ajax({
                url: "/machining-parameter-set/",
                type: "POST",
                data: rowdata,
                success: success,
                error: error
            });
        },
        onDeleteRow: (datatable, rowdata, success, error) => {
            $.ajax({
                url: "/machining-parameter-set/" + rowdata._id,
                type: "DELETE",
                data: rowdata,
                success: success,
                error: error
            });
        },
        onEditRow: (datatable, rowdata, success, error) => {
            $.ajax({
                url: "/machining-parameter-set/" + rowdata._id,
                type: "PUT",
                data: rowdata,
                success: success,
                error: error
            });
        }


    });
});