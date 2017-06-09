<!-- Header-->
<?php $this->load->view('Task/include/header'); ?>
<!-- End Header-->


<!-- SideBar-->
<?php $this->load->view('Task/include/sidebar'); ?>
<!-- End SideBar-->

<script>
    $(document).ready(function(){
        $('#task-table-id').DataTable();
    });
</script>

<!-- Main section-->
<section>
    <!-- Page content-->
    <div class="content-wrapper">
        <span class="success-message">
                             <?php if($this->session->flashdata('success_msg')):
                                 echo $this->session->flashdata('success_msg');
                             endif; ?>
                        </span>
        <span class="error-message">
                             <?php if($this->session->flashdata('error_msg')):
                                 echo $this->session->flashdata('error_msg');
                             endif; ?>
                        </span>
            <div class="space"></div>
            <div class="row">
                <div class="col-md-12">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <div class="">
                                <table id="task-table-id" class="table tabel-hover table-bordered table-responsive" cellspacing="0" width="100%">
                                    <thead>
                                    <tr>
                                        <th class="table_title">#</th>
                                        <th class="table_title">Task Name</th>
                                        <th class="table_title">Task Description</th>
                                        <th class="table_title">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                            
                                    <?php
                                        $counter = 1;
                                        foreach ($task_list as $result){
                                     ?>
                                    <tr>
                                        <td><?php echo $counter ?></td>
                                        <td><?php echo $result->task_name ?></td>
                                        <td><?php echo $result->task_description ?></td>
                                        <td>
                                            <div class="task-button">
                                                <span class='label label-success text-sm'><a href="<?php echo base_url().'Dashboard/edit_task/'.$result->id ?>">Edit</a></span>
                                                <span class='label label-danger text-sm'><a href="<?php echo base_url().'Dashboard/delete_task/'.$result->id ?>">Delete</a></span>
                                            </div>
                                        </td>
                                    </tr>

                                    <?php
                                        $counter++;
                                    } ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
</section>

<!-- Footer-->
<?php $this->load->view('Task/include/footer'); ?>
<!-- End Footer-->