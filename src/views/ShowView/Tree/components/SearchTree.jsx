import React, { useState } from 'react';
import { Tree, Input } from 'antd';

const { Search } = Input;

const x = 3;
const y = 2;
const z = 1;
const gData = [];

const generateData = (_level, _preKey, _tns) => {
    const preKey = _preKey || '0';
    const tns = _tns || gData;

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
generateList(gData);

const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some(item => item.key === key)) {
                parentKey = node.key;
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children);
            }
        }
    }
    return parentKey;
};

/**
 * 可搜索组件
 */
const SearchTree = () => {
    const [expandedKeys, setexpandedKeys] = useState([]);
    const [searchValue, setsearchValue] = useState('');
    const [autoExpandParent, setautoExpandParent] = useState(true);

    const onExpand = expandedKeys => {
        setexpandedKeys(expandedKeys)
        setautoExpandParent(false)
    };

    const onChange = e => {
        const { value } = e.target
        const expandedKeys = dataList
            .map(item => {
                if (item.title.indexOf(value) > -1) {
                    return getParentKey(item.key, gData)
                }
                return null
            })
            .filter((item, i, self) => item && self.indexOf(item) === i)
        setexpandedKeys(expandedKeys)
        setsearchValue(value)
        setautoExpandParent(true)
    };

    const loop = data =>
        data.map(item => {
            const index = item.title.indexOf(searchValue);
            const beforeStr = item.title.substr(0, index);
            const afterStr = item.title.substr(index + searchValue.length);
            const title =
                index > -1 ? (
                    <span>
                        {beforeStr}
                        <span className="site-tree-search-value" style={{ color: '#f50' }}>{searchValue}</span>
                        {afterStr}
                    </span>
                ) : (
                        <span>{item.title}</span>
                    );
            if (item.children) {
                return { title, key: item.key, children: loop(item.children) };
            }

            return {
                title,
                key: item.key,
            };
        });

    return (
        <div>
            <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={onChange} />
            <Tree
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                treeData={loop(gData)}
            />
        </div>
    );
}

export default SearchTree
