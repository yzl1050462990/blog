import {
    EditOutlined,
    FormOutlined,
    CopyOutlined
} from '@ant-design/icons';
const menus = [
    {
        title: "首页",
        path: "/manageboard/home",
        icon: EditOutlined,
        permission:1
    },
    {
        title: "用户管理",
        path: "/user-manage",
        icon: FormOutlined,
        permission:3,
        children: [
            {
                title: "用户列表",
                path: "/user-manage/Usermanage",
                icon: CopyOutlined,
                permission:3,
            }
        ]
    },
    {
        title: "权限管理",
        path: "/limit",
        icon: FormOutlined,
        permission:3,
        children: [
            {
                title: "角色列表",
                path: "/limit/usersList",
                icon: CopyOutlined,
                permission:3,
            },
            {
                title: "权限列表",
                path: "/limit/LimitManage",
                icon: CopyOutlined,
                permission:3,
            }
        ]
    },

    {
        title: "文章管理",
        path: "/article-manage",
        icon: FormOutlined,
        permission:1,
        children: [
            
            {
                title: "文章列表",
                path: "/article-manage/list",
                icon: CopyOutlined,
                permission:1,
            },
            {
                title: "文章分类",
                path: "/article-manage/category",
                icon: CopyOutlined,
                permission:2,
            }
        ]
    },
]

export default menus