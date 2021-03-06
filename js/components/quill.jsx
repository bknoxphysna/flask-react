import ReactQuill from 'react-quill';
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import 'react-quill/dist/quill.snow.css';

const useStyles = makeStyles(theme => ({
  quillWrapper: {
    padding: '10px',
    boxSizing: 'border-box'
  },
  editor: {
    height: '300px',
    '& p': {
      fontSize: '12pt',
      marginTop: '6px'
    }
  },
}));

let handleChange = (content, delta, source, editor) => {
  console.log(editor);
}

export default function Quill() {
  const classes = useStyles();
  const [content, setContent] = useState([]);
  const [page, setPage] = useState([]);
  
  if(content.length == 0) {
    fetch(`/api/v1/editor-content`)
      .then(result => {
        return result.json();
      })
      .then(response => {
        setContent(response.editorHTML);
        setPage(response);
      });
  }
  
  const toolbarOptions = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
    
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
    
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
    
      ['clean']
    ]
  };
  
  return (
    <div style={{maxWidth: '900px', margin:'10px auto 0'}}>
      <Paper style={{textAlign: 'center'}}>
        <Grid container className={classes.quillWrapper}>
          <Grid item md={4}>
            <h2>{ page.header }</h2>
            <p dangerouslySetInnerHTML={{ __html: page.body }}></p>
            <div className={"gif write"}></div>
          </Grid>
          <Grid item md={8}>
            <ReactQuill value={content}
                        modules={toolbarOptions}
                        onChange={handleChange}
                        theme="snow" >
              <div className={classes.editor}></div>
            </ReactQuill>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}