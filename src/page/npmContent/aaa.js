const flowChartJD = {
  code: '0',
  info: '操作成功！',
  value: null,
  success: true,
  data: {
    type: 'horizontal-block', // 固定横向(顶级核对部分)
    nodeList: [
      {
        type: 'block', // 普通“按钮“
        text: '已合并零售单',
        button: [{
          type: 'view',
          text: '查看',
          url: 'SalesSlipCheckedData:list',
          params: { platform: '4' }
        }],
        children: [
          {
            type: 'block',
            linkText: '合并',
            text: '日记账零售单',
            button: [
              {
                type: 'view',
                text: '查看',
                url: 'SalesSlip:list'
              },
              {
                type: 'import',
                text: '导入',
                url: '/thirdpartypay/salesslip/salesImport.do'
              }
            ]
          }
        ]
      },
      {
        type: 'cycle', // "核对处理"圈圈
        button: [{
          type: 'check',
          text: '核对处理',
          url: ''
        }]
      },
      {
        type: 'block',
        text: '已合并结算明细',
        button: [{
          type: 'view',
          text: '查看',
          url: 'SettlementCheckedData:list',
          params: { platform: '4', tenantid: '10221' }
        }],
        children: [
          {
            type: 'block',
            linkText: '合并',
            text: '已到账结算明细',
            button: [{
              type: 'view',
              text: '查看',
              url: 'PlatformSettlementDataJD:list',
              params: { platform: '4', tenantid: '1' }
            }],
            children: [
              {
                type: 'vertical-block', // 竖向
                nodeList: [
                  {
                    type: 'block',
                    text: '已汇总结算明细',
                    button: [{
                      type: 'view',
                      text: '查看',
                      url: 'PlatformSettlementDataJD:list',
                      params: { platform: '4', tenantid: '1' }
                    }]
                  },
                  {
                    type: 'cycle', // "核对处理"圈圈
                    button: [{
                      type: 'check',
                      text: '核对处理',
                      url: ''
                    }]
                  },
                  {
                    type: 'block',
                    text: '钱包账户流水',
                    button: [
                      {
                        type: 'view',
                        text: '查看',
                        url: 'SalesSlip:list'
                      },
                      {
                        type: 'import',
                        text: '导入',
                        url: '/thirdpartypay/salesslip/salesImport.do'
                      }
                    ]
                  }
                ],
                children: [
                  {
                    type: 'block', // 普通“按钮“
                    text: '平台结算明细',
                    linkText: '合并',
                    button: [{
                      type: 'view',
                      text: '查看',
                      url: 'SalesSlipCheckedData:list',
                      params: { platform: '4' }
                    }, {
                      type: 'import',
                      text: '导入',
                      url: '/thirdpartypay/salesslip/salesImport.do'
                    }]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
export default flowChartJD;