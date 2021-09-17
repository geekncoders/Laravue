<template>
    <div>
       <div class="content">
			<div class="container-fluid">
				<div class="_1adminOverveiw_table_recent _box_shadow _border_radious _mar_b30 _p20">
					<p class="_title0">Tags <Button @click="addModal=true"><Icon type="md-add" /> Add tag</Button></p>

					<div class="_overflow _table_div">
						<table class="_table">
							<tr>
								<th>ID</th>
								<th>Tag name</th>
								<th>Created at</th>
								<th>Action</th>
							</tr>
							<tr v-for="(tag, i) in tags" :key="i">
								<td>{{ srn+i }}</td>
								<td class="_table_name">{{ tag.tagName}}</td>
								<td>{{ tag.created_at}}</td>
								<td>
									<Button type="info" size="small" @click="showEditModal(tag, i)">Edit</Button>
									<Button type="error" size="small" @click="deleteTag(tag, i)" :loading="tag.isDeleting">Delete</Button>
									<!-- :loading will show a loader on the button while deleting the tag.
										isDeleting has not been defined so we will define it in the deleteTag method -->
								</td>
							</tr>
					</table>
					</div>
				</div>
			</div>
		</div>
		<!-- Add Tag Modal  -->
		 <Modal v-model="addModal" :mask-closable="false" :closable="false" title="Add a new Tag">
        <Input v-model="data.tagName" placeholder="Enter tag name..." />
		<div slot="footer">
			<Button type="default" @click="addModal=false">Close</Button>
			<Button type="primary" @click="addTag" :disabled="isAdding" :loading="isAdding">{{ isAdding ? 'Adding...' : 'Add Tag' }}</Button>
		</div>
    	</Modal>

		<!-- Edit Tag Modal  -->
		<Modal v-model="editModal" :mask-closable="false" :closable="false" title="Edit your tag name"  >
		<Input v-model="editData.tagName" placeholder="Enter tag Name..." />
		<div slot="footer">
			<Button type="default" @click="editModal=false">Close</Button>
			<Button type="primary" @click="editTag" :disabled="isAdding" :loading="isAdding">{{ isAdding ? 'Editing...' : 'Edit Tag' }}</Button>
		</div>
		</Modal>
    </div>
</template>



<script>
	export default{
		data(){
			return{
				data:{
					tagName: ''
				},
				editData:{
					tagName: ''
				},
				index: -1, 
				addModal: false,
				editModal: false,
				isAdding: false,
				tags: [],
				srn: 1,
			}
		},
	methods: {
		async addTag(){
			// if(this.data.tagName.trim() == '') return this.error('Tag Name is required') // It is also an validation for jquery but we also solved it using laravel controller in AdminController addTag method.
			const res = await this.callApi('post', 'app/create_tag', this.data)
			if(res.status == 201){
				this.tags.unshift(res.data) // It will show data on page without reloading the page
				this.success('Tag has been added successfully')
				this.addModal = false
				this.data.tagName = '' // This will clear the data in the input field | Use this.data = '' for clearing multiple fields
			}else{
				if(res.status == 422){
					if(res.data.errors.tagName){ // First fetch the error so that it doesn't show the error for index
						this.info(res.data.errors.tagName[0]); // Then show the error index. 
					}
				}else{
					this.swr()
				}
			}
		},
		async editTag(){
			if(this.editData.tagName.trim() == '') return this.error('Tag Name is required') // It is also an validation for jquery but we also solved it using laravel controller in AdminController addTag method.
			const res = await this.callApi('post', 'app/edit_tag', this.editData)
			if(res.status == 200){
				alert(this.index)
				this.tags[this.index].tagName = this.editData.tagName  // This line is for showing edited data without refreshing the page.
				this.success('Tag has been edited successfully')
				this.editModal = false
			}else{
				if(res.status == 422){
					alert(res.editData.errors.tagName[0]);
					if(res.editData.errors.tagName){ // First fetch the error so that it doesn't show the error for index
						this.info(res.editData.errors.tagName[0]); // Then show the error index. 
					}
				}else{
					this.swr()
				}
			}
		},
		showEditModal(tag, index){
			let obj = {
				id: tag.id,
				tagName: tag.tagName
			}
			this.editData = obj
			this.editModal = true
			this.index = index
		},
		async deleteTag(tag, i){
			if(!confirm('Are you sure you want to delete the this tag?')) // This will show  an alert box for confirmation to delete	
			return
			this.$set(tag, 'isDeleting', true) // We have created a isDeleting function while it was not already created and is needed for showing loader
			const res = await this.callApi('post','app/delete_tag', tag)
			if(res.status == 200){
				this.tags.splice(i, 1) // This will remove 1 item from the array from the index we have assigned in i in for loop above
				this.success('Tag has been deleted successfully')
			}else{
				this.swr(); // Something went wrong function we used in common.js
			} 
		},
	}, 
	async created(){
		const res = await this.callApi('get', 'app/all_tags')
		if(res.status == 200){
			this.tags = res.data
		}else{
			this.swr
		}
	}
}



// Only For testing common.js

// export default{
// 	async created(){
// 		const res = await this.callApi('post', '/app/create_tag', {tagName: 'testtag'});
// 		console.log(res)
// 		if(res.status==200){
// 			console.log(res)
// 		}else{
// 			console.log('error');
// 		}
// 	}
// }
</script>
