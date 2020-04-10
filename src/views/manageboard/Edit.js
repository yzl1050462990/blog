import React, { Component } from 'react';
import { EditorState, convertToRaw ,ContentState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';
import '../../App.css'

export default class Edit extends Component {
    componentDidMount() {
        const html = this.props.text ? this.props.text : "";   //本段代码意思为将一段html代码转换为edit编译器能显示出来的draftjs对象
          const contentBlock = htmlToDraft(html);
         if (contentBlock) {
              const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
              const editorState = EditorState.createWithContent(contentState);   
            //   console.log(editorState)
              this.setState({
                  editorState : editorState
              })
             }
    }
    
    state = {
        editorState: EditorState.createEmpty(), //富文本编辑器的状态
    }
    render() {
        return (
            <div>
                <Editor editorState={
                        this.state.editorState
                    }
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={
                        this.onEditorStateChange
                    }
                />
            </div>
        )
    }
    onEditorStateChange = (editorState) => {
        var value=this.state.editorState ? draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())) : 1;
        //将edit对象转换成html代码方便存起来
        this.props.editHandler(value)
        this.setState({
            editorState: editorState
        })
    }
}