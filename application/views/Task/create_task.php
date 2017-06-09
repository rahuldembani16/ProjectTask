<!-- Header-->
<?php $this->load->view('Task/include/header'); ?>
<!-- End Header-->

<!-- SideBar-->
<?php $this->load->view('Task/include/sidebar'); ?>
<!-- End SideBar-->

<!-- Main section-->
<section>
    <!-- Page content-->
    <div class="content-wrapper">
        <div class="row">
            <div class="col-lg-12">
                <span class="error-message">
                    <?php if($this->session->flashdata('error_msg')):
                        echo $this->session->flashdata('error_msg');
                    endif; ?>
                </span>
                <!-- START panel-->
                <div id="panelDemo14" class="panel">
                    <div role="tabpanel">
                        <!-- Nav tabs-->
                        <ul role="tablist" class="nav nav-tabs">
                            <li role="presentation" class="active">
                                <a href="#submission" aria-controls="home" role="tab" data-toggle="tab" aria-expanded="false"><h4>Create Task</h4></a>
                            </li>
                        </ul>
                        <!-- Tab panes-->
                        <?php echo form_open('Dashboard/create_task'); ?>
                        <div class="tab-content">
                            <div id="submission" role="tabpanel" class="tab-pane  active">
                                <div class="row">
                                    <div class="col-md-4 ">
                                    <div class="form-group">
                                        Task Name
                                        <input type="text" class="form-control"   id="task_name"  name="task_name"  placeholder="Task Name">
                                        <span style="color: red;font-size: small" id="task_name_error">
                                            <?php if($this->session->flashdata('task_name_error')):
                                                echo $this->session->flashdata('task_name_error');
                                            endif; ?>
                                        </span>
                                    </div>

                                        <div class="form-group">
                                            Task Description
                                            <textarea class="form-control"   id="task_desciption"  name="task_description" rows="4" cols="50"></textarea>
                                        <span style="color: red;font-size: small" id="task_description_error">
                                            <?php if($this->session->flashdata('task_description_error')):
                                                echo $this->session->flashdata('task_description_error');
                                            endif; ?>
                                        </span>
                                        </div>

                                        <div class="form-group">
                                            <input type="submit" onclick="return create_task_validation()" class="btn btn-success blue btn-block" value="Submit" >
                                        </div>
                                    </div>
                                    <div class="col-md-4 ">
                                        <div class="col-md-offset-3 col-md-6">
                                            <br>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <?php echo form_close(); ?>
                    </div>
                </div>
                <!-- END panel-->
            </div>
        </div>
</section>

<!-- Footer-->
<?php $this->load->view('Task/include/footer'); ?>
<!-- End Footer-->