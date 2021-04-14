const treeList = {
    operate: 'and',
    type: 'link',
    children: [
        {
            operate: '=',
            type: 'node',
            leftValue: 'a',
            rightValue: 'b',
        },
        {
            operate: 'or',
            type: 'link',
            children: [
                {
                    operate: '>=',
                    type: 'node',
                    leftValue: 'cc',
                    rightValue: 'group',  
                },
                {
                    operate: 'and',
                    type: 'link',
                    children: [
                        {
                            operate: '>=',
                            type: 'node',
                            leftValue: 'cc',
                            rightValue: 'group',  
                        }
                    ]
                }
            ]
        },
        {
            operate: '<=',
            type: 'node',
            leftValue: 'a',
            rightValue: 'b',
        }
    ]

}

export default treeList 