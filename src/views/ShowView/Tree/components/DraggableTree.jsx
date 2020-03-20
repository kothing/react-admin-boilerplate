import React, { useState } from 'react';
import { Tree } from 'antd';

const x = 3;
const y = 2;
const z = 1;
const initData = [];

const generateData = (_level, _preKey, _tns) => {
    const preKey = _preKey || '0';
    const tns = _tns || initData;

    const children = [];
    for (let i = 0; i < x; i++) {
        const key = `${preKey}-${i}`;
        tns.push({ title: key, key });
        if (i < y) {
            children.push(key);
        }
    }
    if (_level < 0) {
        return tns;
    }
    const level = _level - 1;
    children.forEach((key, index) => {
        tns[index].children = [];
        return generateData(level, key, tns[index].children);
    });
};
generateData(z);
//////////////////////////////////
const dataList = [];
const generateList = data => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const { key } = node;
        dataList.push({ key, title: key });
        if (node.children) {
            generateList(node.children);
        }
    }
};
generateList(initData);



/**
 * 可拖拽Tree
 */
const DraggableTree = () => {
    const [gData, setgData] = useState(initData);
    const [expandedKeys, setexpandedKeys] = useState(['0-0', '0-0-0', '0-0-0-0']);

    const onDragEnter = info => {
        console.log(info);
        // expandedKeys 需要受控时设置
        setexpandedKeys(info.expandedKeys);
    };

    const onDrop = info => {
        console.log(info);
        const dropKey = info.node.props.eventKey;
        const dragKey = info.dragNode.props.eventKey;
        const dropPos = info.node.props.pos.split('-');
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

        const loop = (data, key, callback) => {
            data.forEach((item, index, arr) => {
                if (item.key === key) {
                    return callback(item, index, arr);
                }
                if (item.children) {
                    return loop(item.children, key, callback);
                }
            });
        };
        const data = [...gData];

        // Find dragObject
        let dragObj;
        loop(data, dragKey, (item, index, arr) => {
            arr.splice(index, 1);
            dragObj = item;
        });

        if (!info.dropToGap) {
            // Drop on the content
            loop(data, dropKey, item => {
                item.children = item.children || [];
                // where to insert 示例添加到尾部，可以是随意位置
                item.children.push(dragObj);
            });
        } else if (
            (info.node.props.children || []).length > 0 && // Has children
            info.node.props.expanded && // Is expanded
            dropPosition === 1 // On the bottom gap
        ) {
            loop(data, dropKey, item => {
                item.children = item.children || [];
                // where to insert 示例添加到头部，可以是随意位置
                item.children.unshift(dragObj);
            });
        } else {
            let ar;
            let i;
            loop(data, dropKey, (item, index, arr) => {
                ar = arr;
                i = index;
            });
            if (dropPosition === -1) {
                ar.splice(i, 0, dragObj);
            } else {
                ar.splice(i + 1, 0, dragObj);
            }
        }

        setgData(data);
    };

    return (
        <Tree
            className="draggable-tree"
            defaultExpandedKeys={expandedKeys}
            draggable
            blockNode
            onDragEnter={onDragEnter}
            onDrop={onDrop}
            treeData={gData}
        />
    );
};

export default DraggableTree;
