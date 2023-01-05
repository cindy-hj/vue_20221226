<template>
    <div>
        <h3>Quill Editor</h3>
        {{ state }}

        <div style="width: 700px;">
            <ckeditor :editor="state.editor" v-model="state.editorData" @ready="handleInit"></ckeditor>
        </div>

        <br /><br />

        <div style="width: 700px;">
            <QuillEditor theme="snow" toolbar="full" v-model:content="state.content" style="height: 200px;"></QuillEditor>
        </div>
    </div>
</template>

<script>
// npm install @vueup/vue-quill@beta --save
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { reactive } from '@vue/reactivity';
import { watch } from '@vue/runtime-core';

// npm install --save @ckeditor/ckeditor5-vue @ckeditor/ckeditor5-build-classic
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-vue';


export default {
    components : {
        QuillEditor,
        ckeditor : CKEditor.component,
    },  
    setup () {
        const state = reactive ({
            content : '',
            content1 : 'adfasdf',

            editor: ClassicEditor,
            editorData : '<p>미리 추가된 내용</p>'
        });

        watch(() => state.content, () => {
            console.log(state.content);
        },{
            immediate : true,
            deep : true,
        });

        // @ready => ckeditor 로딩시 호출됨
        const handleInit = (editor) => {
            editor.editing.view.change(writer => {
                writer.setStyle("height","300px", 
                    editor.editing.view.document.getRoot());
            });
            
        };

        return {
            state,
            handleInit
        }
    }
}
</script>

<style lang="css" scoped>

</style>