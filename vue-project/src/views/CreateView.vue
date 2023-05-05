<script>
import FormInput from "../components/FormInput.vue";
import FormLabel from "../components/FormLabel.vue";
import FromTextArea from "../components/FromTextArea.vue";
import TheButton from "../components/TheButton.vue";

export default {
  components: { FormInput, FormLabel, FromTextArea, TheButton },
  data() {
    return {
      name: '',
      price: null,
      description: ''
    }
  },
  methods:{
      async submit(){
          await this.axios.post("http://localhost:4000/api/projects", {
                name: this.name,
                price: this.price,
                description: this.description
            })
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            });
            this.$router.push('/');
      }
  }
}
</script>

<template>
    <div class="w-3/4 form-div  rounded-lg">
        <form @submit.prevent="submit" class="p-4">
            <div>
                <FormLabel value="Name"/>
                <FormInput v-model="name" id="name" name="name" type="text"/>
            </div>
            
            <div class="mt-2">
                <FormLabel value="Price"/>
                <FormInput v-model="price" id="price" name="price" type="number"/>
            </div>

            <div class="mt-2">
                <FormLabel value="Description"/>
                <FromTextArea rows="3" v-model="description" />
            </div>

            <div class="grid justify-items-stretch mt-2">
                <div class="justify-self-end">
                    <TheButton>Submit</TheButton>
                </div>
            </div>
        </form>
    </div>
</template>


<style scoped>

.form-div{
    background-color: var(--vt-c-divider-light-1);
}

</style>
