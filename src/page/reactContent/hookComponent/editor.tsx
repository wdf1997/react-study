import React, { useMemo, useState, useCallback } from 'react'
import { createEditor } from 'slate'  // 导入 Slate 编辑器的工厂函数。
import { Slate, Editable, withReact } from 'slate-react' // 导入 Slate 组件和 React 插件。


const EditorContainer: React.FC = () => {
  // const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState([])

  const onChangeValue = useCallback((value) => {
    setValue(value)
  }, [])
  return (
    // <Slate editor={editor} value={value} onChange={onChangeValue}>
    //   <Editable />
    // </Slate>
    <div/>
  )
}

export default EditorContainer