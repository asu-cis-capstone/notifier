var data_views   = { group:[], single:[], bindings:{}};

data_views.single.push({"selector":".uib_col_1","options":{"effect":["html","attributes"]}});

data_views.single.push({"selector":".uib_col_3","options":{"effect":["html","attributes"]}});


data_views.single.push({"selector":"#conditionalButton","options":{"effect":["html","attributes"]}});

data_views.single.push({"selector":"#disapproveButton","options":{"effect":["html","attributes"]}});
/* prepare controllers */

data_support.prepare_mvc(".uib_col_1", "intel.xdk.services.TicketInfo", [], "null", data_views);

data_support.prepare_mvc(".uib_col_3", "intel.xdk.services.TicketInfo", [], "null", data_views);


data_support.prepare_mvc("#conditionalButton", "intel.xdk.services.ApproverAction", [], "null", data_views);

data_support.prepare_mvc("#disapproveButton", "intel.xdk.services.ApproverAction", [], "null", data_views);
