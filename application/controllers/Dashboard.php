<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('Task_Model');
    }

    public function index()
    {
        $this->load->view('Task/create_task');
    }

    //-------------------------------------------- Get All Task List ---------------------------------------------------
    public function show_tasks()
    {
        $data['task_list'] = $this -> Task_Model -> get_all_tasks();
        $this->load->view('Task/task_list',$data);
    }

    //-------------------------------------------- Add New Task --------------------------------------------------------
    public function create_task()
    {
        $task_name = $this->input->post('task_name');
        $task_description = $this->input->post('task_description');

        // Form Validation
        $this->form_validation->set_rules('task_name','Plese enter task name atleast 3 character','trim|required|min_length[3]');
        $this->form_validation->set_rules('task_description','Plese enter task description atleast 3 character','trim|required|min_length[3]');
        if($this->form_validation->run() == FALSE) {

            $data = array(
                'task_name_error' => 'Plese enter task name atleast 3 character',
                'task_description_error' => 'Plese enter task description atleast 3 character'
            );
            $this->session->set_flashdata($data);
            redirect('dashboard');

        }else {

            $result = $this->Task_Model->add_new_task([
                'task_name' => $task_name,
                'task_description' => $task_description
            ]);

            if ($result) {
                $data = array(
                    'success_msg' => 'Task successfully added'
                );
                $this->session->set_flashdata($data);
                redirect('dashboard/tasks_list');

                echo "successfully created task";

            } else {
                $data = array(
                    'error_msg' => 'Task not created error please try again'
                );
                $this->session->set_flashdata($data);
                redirect('dashboard');
            }

        }

    }
    
    //--------------------------------------------- Delete Task --------------------------------------------------------
    public function delete_task($task_id){
        $result = $this -> Task_Model -> delete_task($task_id);
        if ($result) {
            $data = array(
                'success_msg' => 'Task deleted successfully'
            );
            $this->session->set_flashdata($data);
            redirect('dashboard/tasks_list');

        } else {
            $data = array(
                'error_msg' => 'Task not deleted error please try again'
            );
            $this->session->set_flashdata($data);
            redirect('dashboard/tasks_list');
        }
        
    }

    //---------------------------------------- Edit Task Page View -----------------------------------------------------
    public function  edit_task($task_id){
        $data['task_details'] = $this -> Task_Model -> get_task_details($task_id);
        $this->load->view('Task/edit_task',$data);
    }
    
    //------------------------------------------ Update Task -----------------------------------------------------------
    public function update_task(){
        $task_id = $this->input->post('task_id');
        $task_name = $this->input->post('task_name');
        $task_description = $this->input->post('task_description');

        // Form Validation
        $this->form_validation->set_rules('task_name','Plese enter task name atleast 3 character','trim|required|min_length[3]');
        $this->form_validation->set_rules('task_description','Plese enter task description atleast 3 character','trim|required|min_length[3]');
        if($this->form_validation->run() == FALSE) {

            $data = array(
                'task_name_error' => 'Plese enter task name atleast 3 character',
                'task_description_error' => 'Plese enter task description atleast 3 character'
            );
            $this->session->set_flashdata($data);
            redirect('Dashboard/edit_task/'.$task_id);

        }else {
            $result = $this->Task_Model->update_task([
                'task_name' => $task_name,
                'task_description' => $task_description
            ], $task_id);

            if ($result) {
                $data = array(
                    'success_msg' => 'Task updated successfully'
                );
                $this->session->set_flashdata($data);
                redirect('dashboard/tasks_list');
            } else {
                $data = array(
                    'error_msg' => 'Task not updated error please try again'
                );
                $this->session->set_flashdata($data);
                redirect('dashboard/tasks_list');
            }
        }
    }
    


















    public function add_user_marks($user_id,$quiz_id,$user_marks)
    {
        $data['user_id'] = $user_id;
        $data['quiz_id'] = $quiz_id;
        $data['user_marks'] = $user_marks;
        $this->load->view('Task/add_user_marks',$data);
    }

    public function update_user_marks()
    {
        $user_mark = $this->input->post('user_mark');
        $user_id = $this->input->post('user_id');
        $quiz_id = $this->input->post('quiz_id');

        $result = $this->User_Model->update_user_marks([
            'marks' => $user_mark
        ], $user_id,$quiz_id);

        if($result)
        {
            $data = array(
                'success_msg' => 'Marks Added '
            );
            $this->session->set_flashdata($data);
             redirect('Task/set_user_marks/'.$quiz_id);
        }else
        {
            $data = array(
                'error_msg' => 'Marks not Added error'
            );
            $this->session->set_flashdata($data);
             redirect('Task/set_user_marks/'.$quiz_id);
        }
    }


    // Add New Lecture
    public function add_lecture()
    {
        // Upload Document Content
        $new_name = time().rand(1000, 9000);
        $config['file_name'] = $new_name;
        $config['upload_path']   = './uploadfiles';
        $config['max_size']      = 0;
        $config['allowed_types']  = 'doc|docx|pdf|ppt|xls|xlsx|pptx';
        $this->load->library('upload', $config);
        $title_name = $this->input->post('title');

        // Form Validation
        $this->form_validation->set_rules('title','Please enter content name','trim|required|min_length[3]');
        if($this->form_validation->run() == FALSE)
        {
            $data = array(
                'title_error' => 'Plese enter title atleast 3 character',
                'image_file_error' => 'Please upload only image pdf,doc,ppt,pptx,xls,xlsx'
            );
            $this->session->set_flashdata($data);
            redirect('dashboard');

        }else {

            
            if (!$this->upload->do_upload('file_name')) {
                $data = array(
                    'title_error' => 'Plese enter title atleast 3 character',
                    'image_file_error' => 'Please upload only image pdf,doc,ppt,pptx,xls,xlsx'
                );
                $this->session->set_flashdata($data);
                redirect('dashboard');

            } else {
                $upload_data = $this->upload->data();
                $filename = $upload_data['file_name'];

                $new_result = $this->User_Model->add_new_lecture([
                    'title' => $title_name,
                    'file_name' => $filename,
                    'created_date' => date("Y-m-d h:i:s")
                ]);

                if ($new_result) {
                    $data = array(
                        'success_msg' => 'Content successfully uploaded'
                    );
                    $this->session->set_flashdata($data);
                    redirect('dashboard');
                } else {
                    $data = array(
                        'error_msg' => 'Content does not uploaded error'
                    );
                    $this->session->set_flashdata($data);
                    redirect('dashboard');
                }
            }

        }



    }


    // Add New Material
    public function add_material()
    {
        // Upload Document Content
        $new_name = time().rand(1000, 9000);
        $config['file_name'] = $new_name;
        $config['upload_path']   = './uploadfiles';
        $config['max_size']      = 0;
        $config['allowed_types']  = 'doc|docx|pdf|ppt|xls|xlsx|pptx';
        $this->load->library('upload', $config);
        $title_name = $this->input->post('title');

        // Form Validation
        $this->form_validation->set_rules('title','Please enter content name','trim|required|min_length[3]');
        if($this->form_validation->run() == FALSE)
        {
            $data = array(
                'title_error' => 'Plese enter title atleast 3 character',
                'image_file_error' => 'Please upload only image pdf,doc,ppt,pptx,xls,xlsx'
            );
            $this->session->set_flashdata($data);
            redirect('dashboard/material');

        }else {


            if (!$this->upload->do_upload('file_name')) {
                $data = array(
                    'title_error' => 'Plese enter title atleast 3 character',
                    'image_file_error' => 'Please upload only image pdf,doc,ppt,pptx,xls,xlsx'
                );
                $this->session->set_flashdata($data);
                redirect('dashboard/material');

            } else {
                $upload_data = $this->upload->data();
                $filename = $upload_data['file_name'];

                $new_result = $this->User_Model->add_new_material([
                    'title' => $title_name,
                    'file_name' => $filename,
                    'created_date' => date("Y-m-d h:i:s")
                ]);

                if ($new_result) {
                    $data = array(
                        'success_msg' => 'Content successfully uploaded'
                    );
                    $this->session->set_flashdata($data);
                    redirect('dashboard/material');
                } else {
                    $data = array(
                        'error_msg' => 'Content does not uploaded error'
                    );
                    $this->session->set_flashdata($data);
                    redirect('dashboard/material');
                }
            }

        }



    }


    

}
