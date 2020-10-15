const flowChartJD1 = {
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
            ],
            children: [
              {
                type: 'block',
                linkText: '合并',
                text: '日记账零售单1',
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
                ],
                children: [
                  {
                    type: 'block',
                    linkText: '合并',
                    text: '日记账零售单2',
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
const flowChartJD = {
  code: '0',
  info: '操作成功！',
  value: null,
  success: true,
  data: {
    type: 'horizontal-cycle', // 固定横向(顶级核对部分)
    button: [{
      type: 'check',
      text: '核对处理',
      url: ''
    }],
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
            text: '已记账零售单',
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
            }]
          },
          {
            type: 'vertical-cycle', // 竖向
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
            ]
          },
          {
            type: 'block', // 普通“按钮“
            text: '平台结算明细',
            linkText: '合并',
            button: [{
              type: 'view',
              text: '查看',
              url: 'SalesSlipCheckedData:list',
              params: { platform: '4' }
            },
            {
              type: 'import',
              text: '导入',
              url: '/thirdpartypay/salesslip/salesImport.do'
            }]
          }
        ]
      }
    ]
  }
}
// const flowChartJD = {
//   code: '0',
//   info: '操作成功！',
//   value: null,
//   success: true,
//   rows: [{
//     id: 1,
//     name: '已记账零售单',
//     color: 'bgColor',
//     view: { url: 'SalesSlip:list' },
//     import: '/thirdpartypay/salesslip/salesImport.do',
//     y: 80,
//     x: 50
//   }, {
//     id: 2,
//     img: 'rightArrow',
//     y: 80,
//     x: 150
//   }, {
//     id: 3,
//     name: '已合并零售单',
//     color: 'bgColor',
//     view: { url: 'SalesSlipCheckedData:list', param: { platform: '4' } },
//     import: '',
//     y: 80,
//     x: 250
//   }, {
//     id: 4,
//     img: 'cycle',
//     check: { param: '1' },
//     y: 80,
//     x: 350
//   }, {
//     id: 5,
//     name: '已合并结算明细',
//     color: 'bgColor',
//     view: { url: 'SettlementCheckedData:list', param: { platform: '4', tenantid: '10221' } },
//     import: '',
//     y: 80,
//     x: 450
//   }, {
//     id: 6,
//     img: 'leftArrow',
//     y: 80,
//     x: 560
//   }, {
//     id: 7,
//     name: '已到账结算明细',
//     color: 'bgColor',
//     view: { url: 'PlatformSettlementDataJD:list', param: { platform: '4', tenantid: '1' } },
//     import: '',
//     y: 80,
//     x: 650
//   }, {
//     id: 6,
//     img: 'leftArrow',
//     y: 80,
//     x: 760
//   }, {
//     id: 9,
//     name: '钱包账户流水',
//     color: 'bgColor',
//     view: { url: 'jdAccountFlow:list', param: { platform: '4', tenantid: '1' } },
//     import: '/thirdpartypay/jdaccountflow/jdAccountFlowImport.do',
//     y: 80,
//     x: 850
//   }, {
//     id: 10,
//     img: 'cycle',
//     y: 80,
//     x: 970
//   }, {
//     id: 11,
//     name: '已汇总结算明细',
//     color: 'bgColor',
//     view: { url: 'PlatformDataCheck:list', param: { platform: '4', tenantid: '1' } },
//     import: '',
//     y: 80,
//     x: 1050
//   }, {
//     id: 12,
//     img: 'leftArrow',
//     y: 80,
//     x: 1160
//   }, {
//     id: 13,
//     name: '平台结算明细',
//     color: 'bgColor',
//     view: { url: 'PlatformSettlementDataJD:list', param: { platform: '4', tenantid: '1' } },
//     import: '/thirdpartypay/platformsettlementdatajd/JDSettlementDataImport.do',
//     y: 80,
//     x: 1250
//   }]
// }
const flowChartTM = {
  code: '0',
  info: '操作成功！',
  value: null,
  success: true,
  rows: [{
    id: 1,
    name: '已记账零售单',
    color: 'bgColor',
    view: { url: 'SalesSlip:list' },
    import: '/thirdpartypay/salesslip/salesImport.do',
    y: 80,
    x: 50
  }, {
    id: 2,
    img: 'rightArrow',
    y: 80,
    x: 150
  }, {
    id: 3,
    name: '已合并零售单',
    color: 'bgColor',
    view: { url: 'SalesSlipCheckedData:list', param: { platform: '4' } },
    import: '',
    y: 80,
    x: 250
  }, {
    id: 4,
    img: 'cycle',
    check: { param: '1' },
    y: 80,
    x: 350
  }, {
    id: 3,
    name: '合并后钱包账户流水',
    color: 'bgColor',
    view: { url: 'PlatformSettlementDataJD:list', param: { platform: '4', tenantid: '1' } },
    import: '',
    y: 80,
    x: 450
  }, {
    id: 2,
    img: 'leftArrow',
    y: 80,
    x: 560
  }, {
    id: 4,
    name: '钱包账户流水',
    color: 'bgColor',
    view: { url: 'AlipayBillFlow:list', param: { platform: '4', tenantid: '1' } },
    import: 'thirdpartypay/alipaybillflow/flowImport.do',
    y: 80,
    x: 650
  }]
}
export { flowChartJD, flowChartTM }
