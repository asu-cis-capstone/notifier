/*jshint browser:true */
/*global $ */(function()
{
 "use strict";
 
function clearOptions(selectList){
   // Clear all options from dropdown;
    for(var j = selectList.options.length-1;j>=0;j--){
       selectList.remove(j);
        alert("Options Cleared");
   }
    return false;
}
    
function loadOptions(userName,Password,selectList){
    //Call Api
    intel.xdk.services.PendingList({"URL":"https://api.circlek.com/?pending&a="+userName+":"+Password}).then(function(data) {
        //Populate dropdown with options
        for(var i=0; i < data.rss.api.records; i++) {
            if(data.rss.api.ticket[i].toString()!=="" || data.rss.api.ticket[i]!==null)
            {
           selectList.options[selectList.options.length]= new Option(data.rss.api.ticket[i].ticketno+": "+data.rss.api.ticket[i].title);
            alert("Ticket "+i+" Loaded");
            }
            else{
                alert("no ticke");
            }
        }
    });
}
    
function clearText(){
    var textArea = document.getElementById("commentTextArea");
    textArea.value="";
    return false;
}

    
/*
   hook up event handlers 
 */
 function register_event_handlers()
 {
     var un ="";
     var pw ="";
     var ticketno="";
     var selectMenu = document.getElementById("selecttickets");
    
     /* button  #loginbutton */
    $(document).on("click", "#loginbutton", function(evt)
    {
        un = document.getElementById("usernameinput").value; 
        pw = document.getElementById("passwordinput").value;
        
        
        //Call api for login verification
        intel.xdk.services.Login({"URL":"https://api.circlek.com/?pending&a="+un+":"+pw}).then(function(data) {
            var loginResult = data.rss.api.result;
            if (loginResult == "TRUE") {
                clearOptions(selectMenu);
                loadOptions(un,pw,selectMenu);
                alert("Login was successful. Welcome: "+un);
                clearText();
                af.ui.loadContent("#ticketspage",false,false,"fade");
                
            }
            else{
                    alert("Login Failed");
                }
            });
        return false;
    });
     
    
        /* button  #detailsButton */
    $(document).on("click", "#detailsButton", function(evt)
    {
        var ticketno = document.getElementById("selecttickets").value;
        intel.xdk.services.TicketInfo({"URL":"https://api.circlek.com/?fetch&a="+un+":"+pw+"&t="+ticketno}).then(function(data) {
            alert("call succesful");
            var inputreqname = document.createElement("TEXTAREA");
            var inputreqemail = document.createElement("TEXTAREA");
            var inputescname = document.createElement("TEXTAREA");
            var inputescemail = document.createElement("TEXTAREA");
            var inputgroup = document.createElement("TEXTAREA");
            var inputtitle = document.createElement("TEXTAREA");
            var inputstartdate = document.createElement("TEXTAREA");
            var inputstarttime = document.createElement("TEXTAREA");
            var inputenddate = document.createElement("TEXTAREA");
            var inputendtime = document.createElement("TEXTAREA");
            var inputestdown = document.createElement("TEXTAREA");
            var inputclasstier = document.createElement("TEXTAREA");
            var inputclassrisk = document.createElement("TEXTAREA");
            var inputtimezone = document.createElement("TEXTAREA");
            var inputclasstype = document.createElement("TEXTAREA");
            var inputfulldesc = document.createElement("TEXTAREA");
            var inputimpactdesc = document.createElement("TEXTAREA");
            var inputtestdesc = document.createElement("TEXTAREA");
            var inputinstallplan = document.createElement("TEXTAREA");
            var inputcommplan = document.createElement("TEXTAREA");
            var inputbackoutplan = document.createElement("TEXTAREA");
            
            alert("variables created");
            inputreqname.readOnly=true;
            inputreqname.value="Requestor Name: "+data.rss.api.ticket.reqname;
            document.getElementById("detailInputGroup").appendChild(inputreqname);
            
            inputreqemail.readOnly=true;
            inputreqemail.value="Requestor Email: "+data.rss.api.ticket.reqemail;
            document.getElementById("detailInputGroup").appendChild(inputreqemail);
            
            inputescname.readOnly=true;
            inputescname.value="Esc Name: "+data.rss.api.ticket.escname;
            document.getElementById("detailInputGroup").appendChild(inputescname);
            
            inputescemail.readOnly=true;
            inputescemail.value="Esc Email: "+data.rss.api.ticket.escemail;
            document.getElementById("detailInputGroup").appendChild(inputescemail);
            
            inputgroup.readOnly=true;
            inputgroup.value="Group: "+data.rss.api.ticket.group;
            document.getElementById("detailInputGroup").appendChild(inputgroup);
            
            inputtitle.readOnly=true;
            inputtitle.value="Title: "+data.rss.api.ticket.title;
            document.getElementById("detailInputGroup").appendChild(inputstartdate);
            
            inputstartdate.readOnly=true;
            inputstartdate.value="Start Date: "+data.rss.api.ticket.startdate;
            document.getElementById("detailInputGroup").appendChild(inputstartdate);
            
            inputstarttime.readOnly=true;
            inputstarttime.value="Start Time: "+data.rss.api.ticket.starttime;
            document.getElementById("detailInputGroup").appendChild(inputstarttime);
            
            inputenddate.readOnly=true;
            inputenddate.value="End Date: "+data.rss.api.ticket.enddate;
            document.getElementById("detailInputGroup").appendChild(inputenddate);
            
            inputendtime.readOnly=true;
            inputendtime.value="End Time: "+data.rss.api.ticket.endtime;
            document.getElementById("detailInputGroup").appendChild(inputendtime);
            
            inputestdown.readOnly=true;
            inputestdown.value="Test Downtime: "+data.rss.api.ticket.testdown;
            document.getElementById("detailInputGroup").appendChild(inputestdown);
            
            inputclasstier.readOnly=true;
            inputclasstier.value="Start Date: "+data.rss.api.ticket.classtier;
            document.getElementById("detailInputGroup").appendChild(inputclasstier);
            
            inputclassrisk.readOnly=true;
            inputclassrisk.value="Start Date: "+data.rss.api.ticket.classrisk;
            document.getElementById("detailInputGroup").appendChild(inputclassrisk);
            
            inputtimezone.readOnly=true;
            inputtimezone.value="Start Date: "+data.rss.api.ticket.timezone;
            document.getElementById("detailInputGroup").appendChild(inputtimezone);
            
            inputclasstype.readOnly=true;
            inputclasstype.value="Class type: "+data.rss.api.ticket.classtype;
            document.getElementById("detailInputGroup").appendChild(inputclasstype);
            
            inputfulldesc.readOnly=true;
            inputfulldesc.rows="5";
            inputfulldesc.value="Full Desc: "+data.rss.api.ticket.fulldesc;
            document.getElementById("detailInputGroup").appendChild(inputfulldesc);
            
            inputimpactdesc.readOnly=true;
            inputimpactdesc.rows="5";
            inputimpactdesc.value="Impact Desc: "+data.rss.api.ticket.impactdesc;
            document.getElementById("detailInputGroup").appendChild(inputimpactdesc);
            
            inputtestdesc.readOnly=true;
            inputtestdesc.rows="5";
            inputtestdesc.value="Test Desc: "+data.rss.api.ticket.testdesc;
            document.getElementById("detailInputGroup").appendChild(inputtestdesc);
            
            inputinstallplan.readOnly=true;
            inputinstallplan.rows="5";
            inputinstallplan.value="Install Plan: "+data.rss.api.ticket.installplan;
            document.getElementById("detailInputGroup").appendChild(inputinstallplan);
            
            inputcommplan.readOnly=true;
            inputcommplan.rows="5";
            inputcommplan.value="Comm Plan: "+data.rss.api.ticket.commplan;
            document.getElementById("detailInputGroup").appendChild(inputcommplan);
            
            inputbackoutplan.readOnly=true;
            inputbackoutplan.rows="5";
            inputbackoutplan.value="Backout Plan: "+data.rss.api.ticket.backoutplan;
            document.getElementById("detailInputGroup").appendChild(inputbackoutplan);
            
            af.ui.loadContent("#ticketdetails",false,false,"fade");
            alert("Details lOaded");
            
            });
        return false;
    });
    
        /* button  #approversButton */
    $(document).on("click", "#approversButton", function(evt)
    {
        var ticketno = document.getElementById("selecttickets").value;
        intel.xdk.services.TicketInfo({"URL":"https://api.circlek.com/?fetch&a="+un+":"+pw+"&t="+ticketno}).then(function(data) {
            alert("call succesful");
            var approverCount = data.rss.api.ticket.approvers.records;
            
            for(var i=0; i< approverCount; i++){
                var approverName = document.createElement("TEXTAREA");
                var approverEmail = document.createElement("TEXTAREA");
                var approverType = document.createElement("TEXTAREA");
                var approverStatus = document.createElement("TEXTAREA");
                var approverDate = document.createElement("TEXTAREA");
                var approverComments = document.createElement("TEXTAREA");
                
                approverName.readOnly=true;
                approverName.rows="1";
                approverName.value="Approver "+(i+1)+" Name: "+data.rss.api.ticket.approvers.approver[i].name;
                document.getElementById("approverList").appendChild(approverName);
                
                approverEmail.readOnly=true;
                approverEmail.rows="1";
                approverEmail.value="Approver "+(i+1)+" Email: "+data.rss.api.ticket.approvers.approver[i].email;
                document.getElementById("approverList").appendChild(approverEmail);
                
                approverType.readOnly=true;
                approverType.rows="1";
                approverType.value="Approver "+(i+1)+" Type: "+data.rss.api.ticket.approvers.approver[i].type;
                document.getElementById("approverList").appendChild(approverType);
                
                approverStatus.readOnly=true;
                approverStatus.rows="1";
                approverStatus.value="Approver "+(i+1)+" Status: "+data.rss.api.ticket.approvers.approver[i].status;
                document.getElementById("approverList").appendChild(approverStatus);
                
                approverDate.readOnly=true;
                approverDate.rows="1";
                approverDate.value="Approver "+(i+1)+" Date: "+data.rss.api.ticket.approvers.approver[i].date;
                document.getElementById("approverList").appendChild(approverDate);
                
                approverComments.readOnly=true;
                approverComments.rows="4";
                if(data.rss.api.ticket.approvers.approver[i].comments == "[object Object]"){
                approverComments.value="Approver "+(i+1)+" Comments: No Comment";
                }else{
                approverComments.value="Approver "+(i+1)+" Comments: "+data.rss.api.ticket.approvers.approver[i].comments;
                }
                document.getElementById("approverList").appendChild(approverComments);
            }
            alert("Loop Completed");
            
            af.ui.loadContent("#approvers",false,false,"fade");
            alert("Approvers loaded");
            
            });
        return false;
    });
    
        /* button  #approveButton */
    $(document).on("click", "#approveButton", function(evt)
    {
        var ticketno = document.getElementById("selecttickets").value;
        var comment = document.getElementById("commentTextArea").value;
        var message;
        intel.xdk.services.ApproverAction({"URL":"https://api.circlek.com/?approval&a="+un+":"+pw+"&t="+ticketno+"&d=a&m="+comment}).then(function(data) {
            if(comment===""){
                alert("Please enter a comment, or No comment");
            }else{
                if(data.rss.api.result == "TRUE"){
                    message = "Your Submission was Succesful. Click Ok Continue";
                }else{
                    message = "Your Submission Failed Please try Again later. Click Ok to return to the main page";
                }
                alert(message);
                clearOptions(selectMenu);
                loadOptions(un,pw,selectMenu);
                clearText();
                af.ui.loadContent("#",false,false,"fade");
                
            }
        }); 
        return false;
    });
    
        /* button  #conditionalButton */
    $(document).on("click", "#conditionalButton", function(evt)
    {
        var ticketno = document.getElementById("selecttickets").value;
        var comment = document.getElementById("commentTextArea").value;
        var message;
        intel.xdk.services.ApproverAction({"URL":"https://api.circlek.com/?approval&a="+un+":"+pw+"&t="+ticketno+"&d=c&m="+comment}).then(function(data) {
            if(comment===""){
                alert("You must enter a comment describing your conditions");
            }else{
                if(data.rss.api.result == "TRUE"){
                    message = "Your Submission was Succesful. Click Ok to return to the main page";
                }else{
                    message = "Your Submission Failed Please try Again later. Click Ok to return to the main page";
                }
                alert(message);
                clearOptions(selectMenu);
                loadOptions(un,pw,selectMenu);
                clearText();
                af.ui.loadContent("#",false,false,"fade");
                
            }
        }); 
        return false;
    });
    
        /* button  #disapproveButton */
    $(document).on("click", "#disapproveButton", function(evt)
    {
        var ticketno = document.getElementById("selecttickets").value;
        var comment = document.getElementById("commentTextArea").value;
        var message;
        intel.xdk.services.ApproverAction({"URL":"https://api.circlek.com/?approval&a="+un+":"+pw+"&t="+ticketno+"&d=d&m="+comment}).then(function(data) {
            if(comment===""){
                alert("You must enter a comment describing why you are disapproving");
            }else{
                if(data.rss.api.result == "TRUE"){
                    message = "Your Submission was Succesful. Click Ok to return to the main page";
                }else{
                    message = "Your Submission Failed Please try Again later. Click Ok to return to the main page";
                }
                alert(message);
                clearOptions(selectMenu);
                loadOptions(un,pw,selectMenu);
                clearText();
                af.ui.loadContent("#",false,false,"fade");
                
            }
        });
        return false;
    });
    
    }
    
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
