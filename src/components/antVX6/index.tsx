import React, { useEffect, useRef, useState } from 'react';
import { Graph, Path, Edge } from '@antv/x6';
import { register } from '@antv/x6-react-shape';
import { Snapline } from '@antv/x6-plugin-snapline';
import { Tooltip, Dropdown } from 'antd';
import style from './index.module.less';

const FlowNode = ({ node }) => {
    return (
        <Dropdown
            menu={{
                items: [
                    {
                        key: 'upstream',
                        label: '编辑上游',
                        onClick(e) {
                            console.log('e', node);
                        }
                    },
                    {
                        key: 'downstream',
                        label: '编辑下游',
                        onClick(e) {
                            console.log('e', node);
                        }
                    }
                ]
            }}
            trigger={['contextMenu']}
        >
            <div className={style['custom-react-node']}>{node.data.name}</div>
        </Dropdown>
    );
};

register({
    shape: 'data-processing-dag-node',
    width: 212,
    height: 48,
    component: FlowNode,
    // port默认不可见
    ports: {
        groups: {
            in: {
                position: 'left',
                attrs: {
                    circle: {
                        r: 4,
                        magnet: true,
                        stroke: 'transparent',
                        strokeWidth: 1,
                        fill: 'transparent'
                    }
                }
            },

            out: {
                position: {
                    name: 'right',
                    args: {
                        dx: -32
                    }
                },

                attrs: {
                    circle: {
                        r: 4,
                        magnet: true,
                        stroke: 'transparent',
                        strokeWidth: 1,
                        fill: 'transparent'
                    }
                }
            }
        }
    }
});

// 注册连线
Graph.registerConnector(
    'curveConnector',
    (sourcePoint, targetPoint) => {
        const hgap = Math.abs(targetPoint.x - sourcePoint.x);
        const path = new Path();
        path.appendSegment(
            Path.createSegment('M', sourcePoint.x - 4, sourcePoint.y)
        );
        path.appendSegment(
            Path.createSegment('L', sourcePoint.x + 12, sourcePoint.y)
        );
        // 水平三阶贝塞尔曲线
        path.appendSegment(
            Path.createSegment(
                'C',
                sourcePoint.x < targetPoint.x
                    ? sourcePoint.x + hgap / 2
                    : sourcePoint.x - hgap / 2,
                sourcePoint.y,
                sourcePoint.x < targetPoint.x
                    ? targetPoint.x - hgap / 2
                    : targetPoint.x + hgap / 2,
                targetPoint.y,
                targetPoint.x - 6,
                targetPoint.y
            )
        );
        path.appendSegment(
            Path.createSegment('L', targetPoint.x + 2, targetPoint.y)
        );

        return path.serialize();
    },
    true
);

Edge.config({
    markup: [
        {
            tagName: 'path',
            selector: 'wrap',
            attrs: {
                fill: 'none',
                cursor: 'pointer',
                stroke: 'transparent',
                strokeLinecap: 'round'
            }
        },
        {
            tagName: 'path',
            selector: 'line',
            attrs: {
                fill: 'none',
                pointerEvents: 'none'
            }
        }
    ],
    connector: { name: 'curveConnector' },
    attrs: {
        wrap: {
            connection: true,
            strokeWidth: 10,
            strokeLinejoin: 'round'
        },
        line: {
            connection: true,
            stroke: '#A2B1C3',
            strokeWidth: 1,
            targetMarker: {
                name: 'classic',
                size: 6
            }
        }
    }
});

Graph.registerEdge('data-processing-curve', Edge, true);

export default class Example extends React.Component {
    private container: HTMLDivElement;

    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            autoResize: true,
            background: {
                color: '#F2F7FA'
            },
            panning: true,
            mousewheel: true
        });

        graph.use(
            new Snapline({
                enabled: true
            })
        );

        const data = {
            nodes: [
                {
                    nodeId: '1',
                    nodeName: '网络防火墙部署手册v1',
                    type: 'DATA_SET_VERSION'
                },
                {
                    nodeId: '2',
                    nodeName: '网络防火墙部署手册v2',
                    type: 'DATA_SET_VERSION'
                },
                {
                    nodeId: '3',
                    nodeName: '网络防火墙部署手册v3',
                    type: 'DATA_SET_VERSION'
                },
                {
                    nodeId: '4',
                    nodeName: '网络防火墙部署手册v4',
                    type: 'DATA_SET_VERSION'
                },
                {
                    nodeId: '5',
                    nodeName: '防火墙专业知识模型',
                    type: 'MODEL'
                },
                {
                    nodeId: '6',
                    nodeName: '网络防火墙向量知识库',
                    type: 'KNOWLEDGE_REPO'
                },
                {
                    nodeId: '7',
                    nodeName: '网络防火墙问答机器人',
                    type: 'APP'
                }
            ],
            edges: [
                {
                    fromNode: '1',
                    toNode: '2',
                    edgeId: '1',
                    type: 'DATA_CLEAN'
                },
                {
                    fromNode: '1',
                    toNode: '3',
                    edgeId: '2',
                    type: 'DATA_CLEAN'
                },
                {
                    fromNode: '3',
                    toNode: '4',
                    edgeId: '3',
                    type: 'QA_TASK'
                },
                {
                    fromNode: '4',
                    toNode: '5',
                    edgeId: '4',
                    type: 'TRAIN_MODEL'
                },
                {
                    fromNode: '3',
                    toNode: '6',
                    edgeId: '5',
                    type: 'CREATE_KNOWLEDGE_REPO'
                },
                {
                    fromNode: '6',
                    toNode: '7',
                    edgeId: '6',
                    type: 'CREATE_APP'
                }
            ]
        };

        const map = new Map();
        data.edges.forEach((item) => {
            if (!map.has(item.fromNode)) {
                map.set(item.fromNode, [item.toNode]);
            } else {
                map.set(item.fromNode, [
                    ...map.get(item.fromNode),
                    item.toNode
                ]);
            }
        });
        const mapColArr = [...map.entries()].reduce((prev, cur) => {
            const i = prev.findIndex((it) => {
                return it?.includes(cur[0]);
            });
            if (~i) {
                if (!prev[i + 1]) {
                    prev.push(cur[1]);
                } else {
                    const node = prev[i + 1];
                    prev[i + 1] = [...node, ...cur[1]];
                }
            } else {
                prev.push(cur[1]);
            }
            return prev;
        }, []);
        const mapRowArr = [...map.entries()];

        const fromJSON = {
            nodes: data.nodes.reduce((prev, cur, i) => {
                const xIndex = mapColArr.findIndex((it) => {
                    return it.includes(cur.nodeId);
                });
                let yIndex = 0;
                mapRowArr.forEach(([key, value]) => {
                    const i = value.findIndex((it) => {
                        return it === cur.nodeId;
                    });
                    if (~i) {
                        yIndex = i;
                    }
                });
                const curFromKeyVal = [...map.entries()].find(
                    ([key, value]) => {
                        return value.includes(cur.nodeId);
                    }
                );
                const curFrom = prev.find(
                    (item) => item.id === curFromKeyVal[0]
                );

                prev.push({
                    ...cur,
                    id: cur.nodeId,
                    shape: 'data-processing-dag-node',
                    data: {
                        name: cur.nodeName,
                        type: cur.type
                    },
                    x: i ? (xIndex + 1) * 300 : 0,
                    y: i ? (curFrom?.y || 0) + yIndex * 100 : 0,
                    ports: [
                        {
                            id: `${cur.nodeId}-out`,
                            group: 'out'
                        }
                    ]
                });

                return prev;
            }, []),
            edges: data.edges.map((item) => {
                return {
                    ...item,
                    shape: 'data-processing-curve',
                    source: {
                        cell: item.fromNode,
                        port: `${item.fromNode}-out`
                    },
                    target: {
                        cell: item.toNode,
                        port: `${item.toNode}-in`
                    },
                    zIndex: -1,
                    data: {
                        source: item.fromNode,
                        target: item.toNode
                    }
                };
            })
        };

        graph.fromJSON(fromJSON);
        graph.centerContent();
    }

    refContainer = (container: HTMLDivElement) => {
        this.container = container;
    };

    render() {
        return (
            <div className={style['react-shape-app']}>
                <div className={style['app-content']} ref={this.refContainer} />
            </div>
        );
    }
}
