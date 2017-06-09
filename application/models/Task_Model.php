<?php
class Task_Model extends CI_Model {

    //--------------------------------------- Add New Task -------------------------------------------------------------
    function add_new_task($data)
    {
        $result = $this->db->insert('tasks',$data);
        return  $result;
    }

    //-------------------------------------- Get All Task List ---------------------------------------------------------
    function get_all_tasks()
    {
        $result = $this->db->order_by('id','desc')
                        ->get('tasks');
        return $result->result();
    }

    //----------------------------------------- Delete Task ------------------------------------------------------------
    function delete_task($task_id)
    {
        $result = $this->db->where('id', $task_id)
                         ->delete('tasks');
        return $result;
    }

    //---------------------------------------- Get Task Details --------------------------------------------------------
    function get_task_details($task_id){
        $result = $this->db->where('id',$task_id)
                        ->get('tasks')
                            ->result();
        return $result;
    }

    //------------------------------------------ Update Task -----------------------------------------------------------
    function update_task($data,$task_id)
    {
        $result = $this->db->where(['id' => $task_id])
                            ->update('tasks',$data);
        return $result;
    }

}
?>