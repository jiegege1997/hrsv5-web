<template>
<div class="agentList">
    <el-main>
        <!-- 数据来源标题 -->
        <el-row>
            <i class="fa text-warning fa-desktop blue"></i>
            <span>数据源Agent列表</span>
            <router-link to="/index1001">
                <el-button type="primary" size="small" class="goIndex">
                    <i class="fa fa-home fa-lg"></i>返回首页
                </el-button>
            </router-link>
        </el-row>
         <div class="lines"></div>
        <!-- 列表内容 -->
        <div class="listContent">
            <div class="listPic" @click="tapDifferentType(1)">
                <img src="@/assets/images/datasource.png" alt="数据图片" />
            </div>
            <h3>数据库 Agent</h3>
            <p>数据库 Agent 是用于采集结构化数据（RDBMS Etc）的Agent，只需要一个Agent就可以采集同一数据源中的不同源数据</p>
        </div>

        <div class="listContent">
            <div class="listPic" @click="tapDifferentType(4)">
                <img src="@/assets/images/a1.png" alt="数据图片" />
            </div>
            <h3>数据库文件 Agent</h3>
            <p>数据文件 Agent 是用于对各种关系型存储的数据文件进行数据采集的组件，例如从RDBMS数据库中卸载的CSV或各种自定义格式的数据文件，以EXCEL存储的行列关系的数据文件</p>
        </div>

        <div class="listContent">
            <div class="listPic" @click="tapDifferentType(5)">
                <img src="@/assets/images/object.png" alt="数据图片" />
            </div>
            <h3>半结构化 Agent</h3>
            <p>半结构化 Agent 是用于采集各种半结构化数据的组件，例如XML、JSON等储存在文件系统之上的数据文件。</p>
        </div>

        <div class="listContent">
            <div class="listPic" @click="tapDifferentType(2)">
                <img src="@/assets/images/filesource.png" alt="数据图片" />
            </div>
            <h3>非结构化 Agent</h3>
            <p>非结构化 Agent 是用于采集各种半结构化或非结构化数据的组件，例如Word、PDF、图片文件等存储在文件系统之上的数据文件。</p>
        </div>

        <div class="listContent">
            <div class="listPic" @click="tapDifferentType(3)">
                <img src="@/assets/images/ftp.png" alt="数据图片" />
            </div>
            <h3>FTP Agent</h3>
            <p>FTP Agent 是用于将系统之上的数据文件使用SFTP的方式将数据拉取到指定的系统盘之上的组件，多用于数据分发等。</p>
        </div>

        <!-- 数据类型标题 -->
        <h4>
            当前所属数据源为：
            <strong>{{this.$route.params.dataName}}</strong>
        </h4>
        <!-- 数据表格标题 -->
        <div class="tableList">
            <el-row>
                <i class="fa text-warning fa-database blue"></i>
                <span>数据源Agent</span>
                <!-- 添加数据表单弹出框  -->
                <el-button type="success" class="addAgent" size="small" @click="dialogFormVisible = true;DataCathInfo()">新增数据库Agent</el-button>
            </el-row>
            <!-- 表格内容 -->
                <el-table stripe size="mini" :data="tableData" border :header-cell-style="{background:'#ede7f3',color:'black'}">
                    <el-table-column prop="agent_name" label="Agent名称" width="188" align="center"></el-table-column>
                    <el-table-column prop="agent_ip" label="Agent所在服务器IP" width="316" align="center"></el-table-column>
                    <el-table-column prop="agent_port" label="Agent 连接端口" width="262" align="center"></el-table-column>
                    <el-table-column prop="user_id" label="数据采集用户" width="216" align="center"></el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="dialogFormVisibleview = true;handleEdit(scope.$index, scope.row);DataCathInfo()">编辑</el-button>
                            <el-button size="mini" type="danger" @click="dialogFormVisibleDelte = true;handleEdit(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            <div class="lines"></div>
        </div>
        <!-- 点击新增数据库按钮弹出框 -->
        <el-dialog title="添加数据库 Agent" :visible.sync="dialogFormVisible" width="40%">
            <el-form :model="formAdd" ref="formAdd" :rules="rules">
                <el-form-item label=" Agent名称" :label-width="formLabelWidth" prop="agent_name">
                    <el-input v-model="formAdd.agent_name" autocomplete="off" placeholder="Agent名称" style="width:284px"></el-input>
                </el-form-item>
                <el-form-item label=" Agent所在服务器ip" :label-width="formLabelWidth" prop="agent_ip">
                    <el-input v-model="formAdd.agent_ip" autocomplete="off" placeholder="例如 127.9.08.7" style="width:284px"></el-input>
                </el-form-item>
                <el-form-item label=" Agent 连接端口" :label-width="formLabelWidth" prop="agent_port">
                    <el-input v-model="formAdd.agent_port" autocomplete="off" placeholder="端口范围1204-65535" style="width:284px"></el-input>
                </el-form-item>
                <el-form-item label=" 数据采集用户" :label-width="formLabelWidth" prop="agent_type">
                    <el-select v-model="formAdd.user_id" filterable placeholder="请选择" style="width:284px">
                        <el-option v-for="(item,index) in options" :key="index" :label="item.user_name" :value="item.user_id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancleAdd" size="mini" type="danger">取 消</el-button>
                <el-button type="primary" @click="add('formAdd')" size="mini">保存</el-button>
            </div>
        </el-dialog>
        <!-- 点击编辑按钮编辑信息弹出框 -->
        <el-dialog title="编辑数据库 Agent" :visible.sync="dialogFormVisibleview" width="40%">
            <el-form :model="form" ref="form" :rules="rules">
                <el-form-item label=" Agent名称" :label-width="formLabelWidth" prop="agent_name">
                    <el-input v-model="form.agent_name" autocomplete="off" style="width:284px"></el-input>
                </el-form-item>
                <el-form-item label=" Agent所在服务器ip" :label-width="formLabelWidth" prop="agent_ip">
                    <el-input v-model="form.agent_ip" autocomplete="off" style="width:284px"></el-input>
                </el-form-item>
                <el-form-item label=" Agent 连接端口" :label-width="formLabelWidth" prop="agent_port">
                    <el-input v-model="form.agent_port" autocomplete="off" style="width:284px"></el-input>
                </el-form-item>
                <el-form-item label=" 数据采集用户" :label-width="formLabelWidth" prop="depIds">
                    <el-select v-model="form.user_id" filterable placeholder="请选择" style="width:284px">
                        <el-option v-for="(item,index) in options" :key="index" :label="item.user_name" :value="item.user_id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancleAdd" size="mini" type="danger">取 消</el-button>
                <el-button type="primary" @click="AgentEdit('form')" size="mini">保存</el-button>
            </div>
        </el-dialog>
        <!-- 点击删除弹出框 -->
        <el-dialog title="温馨提示" :visible.sync="dialogFormVisibleDelte" width="40%">
            <span>确定要删除吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="dialogFormVisibleDelte = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="delteThisData" size="mini">确 定</el-button>
            </span>
        </el-dialog>
    </el-main>
</div>
</template>

<script>
import * as functionAll from "./datasource";
export default {
    data() {
        return {
            dialogFormVisible: false,
            dialogFormVisibleview: false,
            dialogFormVisibleDelte: false,
            options: [],
            tableData: [],
            getAgentData: {},
            source_id: "",
            sourceId: "",
            datasourceName: "",
            agentId: "",
            agent_type: "",
            agentType: "",
            dataAll:{},
            formAdd: {
                agent_name: "",
                agent_ip: "",
                agent_port: "",
                user_id: ""
            },
            form: {
                agent_name: "",
                agent_ip: "",
                agent_port: "",
                user_id: ""
            },
            rules: {
                agent_name: [{
                    required: true,
                    message: "不能为空",
                    trigger: "blur"
                }],
                agent_ip: [{
                    required: true,
                    message: "不能为空",
                    trigger: "blur"
                }],
                agent_port: [{
                    required: true,
                    message: "不能为空",
                    trigger: "blur"
                }]
            },
            formLabelWidth: "150px"
        };
    },
    created() {
        this.getAgentAllData()
    },
    methods: {
        // 获取agent数据内容方法
        getAgentAllData() {
            this.sourceId = this.$route.params.scouresId;
            this.datasourceName = this.$route.params.dataName;
            // 发送请求获取数据
            const querystring = require("querystring");
            functionAll.getAgentData(querystring.stringify({
                sourceId: this.sourceId,
                datasourceName: this.datasourceName
            })).then(res => {
                if (res.code == 200) {
                    // 传参
                    // this.tableData = res.data.sjkAgent;
                    this.agent_type = res.data.sjkAgent[0].agent_type;
                    this.dataAll =res.data;
                    this.tableData =dataAll.sjkAgent;
                }
            });
        },
        // 点击查看获取数据采集信息
        DataCathInfo(index) {
            functionAll.getDataUserInfo().then(res => {
                if (res.code == 200) {
                    this.options = res.data;
                }
            });
        },
        // 点击编辑获取当前数据赋给表单
        handleEdit(index, row) {
            this.form.agent_name = row.address;
            this.form.agent_port = row.name;
            this.agentId = row.agent_id;
            this.agentType = row.agent_type;
            this.agent_type = row.agent_type;
            this.source_id = row.source_id
        },
        // 新增数据库Agent
        add(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    // 调用添加方法
                    this.formAdd["source_id"] = this.$route.params.scouresId;
                    this.formAdd["agent_type"] = this.agent_type;
                    functionAll.addDataAgent(this.formAdd).then(response => {
                        if (response && response.success) {
                            this.$message({
                                type: "success",
                                message: "添加成功!"
                            });
                            this.getAgentAllData();
                            // this.tableData = response.data;
                            // 隐藏对话框
                            this.dialogFormVisible = false;
                            // 表单清空
                            this.formAdd = {};
                        } else {
                            this.$message.error("添加失败！");
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        // 点击取消按钮
        cancleAdd() {
            // 表单清空
            this.formAdd = {};
            // 隐藏对话框
            this.dialogFormVisible = false;
            this.dialogFormVisibleview = false;
        },
        // 点击不同的数据类型获取不同的数据
        tapDifferentType(e) {
            switch (e) {
                case 1:
                    this.agent_type =e;
                    // 给tableData渲染对应的数组，先看上面能不能拿到；
                    break;
                case 2:
                    this.agent_type =e;
                    break;
                case 3:
                    this.agent_type =e;
                    break;
                case 4:
                    this.agent_type =e;
                    break;
                case 5:
                    this.agent_type =e;
                    break;
                default:
            }

        },
        // 点击编辑的保存按钮更新数据
        AgentEdit() {
            this.form["source_id"] = this.$route.params.scouresId;
            this.form["agentId"] = this.agentId;
            this.form["agent_type"] = this.agent_type;
            functionAll.updateDataAgent(this.form).then(response => {
                if (response && response.success) {
                    this.$message({
                        type: "success",
                        message: "更新成功!"
                    });
                    this.getAgentAllData();
                    // 隐藏对话框
                    this.dialogFormVisibleview = false;
                    // 表单清空
                    this.form = {};
                    // // 重新渲染页面
                    // this.tableData = response.data;
                } else {
                    this.$message.error("更新失败！");
                }
            });
        },
        // 点击删除数据
        delteThisData() {
            const querystring = require("querystring");
            functionAll
                .deleteDataAgent(
                    querystring.stringify({
                        agentId: this.agentId,
                        agentType: this.agentType
                    })
                )
                .then(res => {
                    if (res.code == 200) {
                        // 隐藏对话框
                        this.getAgentAllData();
                        this.dialogFormVisibleDelte = false;
                        // 表单清空
                        this.form = {};
                        // // 重新渲染页面
                        // this.tableData = res.data;
                    }
                });
        }
    }
};
</script>

<style scoped>
.agentList {
    width: 100%;
}

/* .agentList .el-main {
    padding: 0 53px 0 53px;
} */

/* 图标字体设置 */
.el-row {
    width: 100%;
    height: 64px;
    line-height: 64px;
}

.el-row span {
    color: #2196f3;
    font-size: 18px;
}

/* 字体小图标样式设置 */
.fa-desktop {
    color: #2196f3;
    margin-right: 5px;
}

.fa-database {
    color: #2196f3;
    margin-right: 5px;
}

.fa-home {
    margin-right: 5px;
}

/* button样式设置 */
.goIndex {
    float: right;
    background: #337ab7;
    margin-top: 18px;
    margin-right: 14px;
}

.addAgent {
    background: #5cb85c;
    float: right;
    margin-top: 18px;
    margin-right: 14px;
}

/* 下划线样式 */
.lines {
    width: 100%;
    min-height: 1px;
    background: #dddddd;
    margin-bottom: 15px;
}

/* 列表内容 */
.listContent {
    width: 207px;
    padding: 10px 10px 0 10px;
    border: 1px solid #cccccc;
    height: 278px;
    margin-bottom: 20px;
    margin-right: 42px;
    float: left;
    border-radius: 4px;
}

.listPic {
    width: 108px;
    border: 1px solid #cccccc;
    height: 108px;
    margin-left: 46px;
    padding: 1px 5px;
    margin-bottom: 22px;
}

.listPic:hover {
    cursor: pointer;
    background: #e6e6e6;
}

.listPic img {
    width: 100%;
    height: 100%;
}

.listContent h3 {
    text-align: center;
    font-size: 24px;
    font-weight: normal;
    line-height: 30px;
    margin-bottom: 10px;
}

.listContent p {
    font-size: 13px;
    line-height: 17px;
}

/* 数据类型标题 */
h4 {
    height: 39px;
    line-height: 39px;
    clear: left;
    font-size: 18px;
    font-weight: normal;
}

h4 strong {
    font-size: 18px;
    color: red;
}

/* 表格数据 */
.tableList {
    width: 98%;
    min-height: 132px;
    border: 1px solid #cccccc;
    padding: 0 1%;
}
</style>
