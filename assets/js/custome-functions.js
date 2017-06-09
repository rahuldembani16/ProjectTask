// ---------------------------- Create Task Validation -----------------------------------------------------------------
function create_task_validation()
{
    var task_name = $( "#task_name" ).val();
    var task_desciption = $( "#task_desciption" ).val();

    if( task_name.length < 3)
    {
        $( "#task_name_error" ).html('Plese enter task name atleast 3 character');

    }else{ $( "#task_name_error" ).html(''); }

    if( task_desciption.length < 3)
    {
        $( "#task_description_error" ).html('Plese enter task description atleast 3 character');

    }else{ $( "#task_description_error" ).html(''); }

    var error_msg1 = $( "#task_name_error" ).html();
    var error_msg2 = $( "#task_description_error" ).html();

    if(error_msg1 != '' ||  error_msg2 != '' )
    {
        return false;
    }
}
// ---------------------------- End Create Task Validation -------------------------------------------------------------