import request from '@/utils/request'


/**
 * 点击查看按钮获取数据采集用户
 */
export function getDataUserInfo() {
    return request({
        url: '/hrds_B/B/action/hrds/b/biz/datasource/searchDataCollectUser',
        method: 'post',
    })
}

/**
 * 点击新增数据库按钮增加信息
 */
export function addDataAgent(data) {
    return request({
        url: '/hrds_B/B/action/hrds/b/biz/agentinfo/saveAgent',
        method: 'post',
        params:data
    })
}

/**
 * 点击编辑数据库更新信息
 */
export function updateDataAgent(data) {
    return request({
        url: '/hrds_B/B/action/hrds/b/biz/agentinfo/saveAgent',
        method: 'post',
        params:data
    })
}

/**
 * 点击删除按钮删除信息
 */
export function deleteDataAgent(data) {
    return request({
        url: '/hrds_B/B/action/hrds/b/biz/agentinfo/deleteAgent',
        method: 'post',
        data:data
    })
}

/**
 * 获取首页的数据
 */
export function getIndexDataAll() {
    return request({
        url: '/hrds_B/B/action/hrds/b/biz/datasource/searchDataSourceInfo',
        method: 'post'
    })
}



/**
 * 添加数据源数据信息
 */
export function addDataResource(data) {
    return request({
        url: '/hrds_B/B/action/hrds/b/biz/datasource/saveDataSource',
        method: 'post',
        params: data
    })
}

/**
 * 导入数据源数据信息
 */
export function importDataResource(data) {
    return request({
        url: '/hrds_B/B/action/hrds/b/biz/datasource/uploadFile',
        method: 'post',
        params: data
    })
}


/**
 * 编辑更新数据源信息
 */
export function updateDataResource(data) {
    return request({
        url: '/hrds_B/B/action/hrds/b/biz/datasource/updateDataSource',
        method: 'post',
        params: data
    })
}

/**
 * 点击编辑按钮获取部门信息
 */
export function getDepartmentInfo(data) {
    return request({
        url: '/hrds_B/B/action/hrds/b/biz/datasource/searchDataSource',
        method: 'post',
        params:data
    })
}


/**
 * 点击上传按钮上传数据
 */
export function tapUploadData(data) {
    return request({
        url: '/hrds_B/B/action/hrds/b/biz/datasource/uploadFile',
        method: 'post',
        params: data
    })
}

/**
 * 数据权限管理，更新数据源关系部门信息
 */
export function upDatechargeDate(data) {
    return request({
        url: '/hrds_B/B/action/hrds/b/biz/datasource/updateAuditSourceRelationDep',
        method: 'post',
        params: data
		// params:{data,depIdsString}
    })
}

/**
 * 数据权限管理，更新数据源关系部门信息
 */
export function getDataDepInfo(data) {
    return request({
        url: '/hrds_B/B/action/hrds/b/biz/datasource/searchDataSource',
        method: 'post',
        data:data
    })
}

 /**
   * 查询数据源对应agent所有信息，数据源页面到agent页面
   */
  export function getAgentData(sourceId) {
    return request({
        url: '/hrds_B/B/action/hrds/b/biz/agentinfo/searchDatasourceAndAgentInfo',
        method: 'post',
        data: sourceId
    })
}

/**
   *点击删除按钮删除数据源
   */
  export function deleteDataSource(data) {
    return request({
        url: '/hrds_B/B/action/hrds/b/biz/datasource/deleteDataSource',
        method: 'post',
        data:data
    })
}