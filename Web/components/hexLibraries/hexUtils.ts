﻿export class Node {
    parent: Node = null;
    x = 0;
    y = 0;
    item: Vector3d = null;
    f = 0;
    g = 0;

    constructor(parent: Node, piece: Vector3d) {
        this.parent = parent;
        // array index of this Node in the world linear array

        // the location coordinates of this Node
        this.x = piece.x;
        this.y = piece.z;
        this.item = piece;
        // the distanceFunction cost to get
        // TO this Node from the START
        this.f = 0;
        // the distanceFunction cost to get
        // from this Node to the GOAL
        this.g = 0
    }

    value() {
        return this.x + (this.y * 5000);
    }
}

export interface Vector3d {
    x: number;
    y: number;
    z: number;
}


export class HexUtils {

    static distance(p1, p2) {
        const x1 = p1.x;
        const y1 = p1.z;

        const x2 = p2.x;
        const y2 = p2.z;

        const du = x2 - x1;
        const dv = (y2 + ((x2 / 2) | 0)) - (y1 + ((x1 / 2) | 0));
        if ((du >= 0 && dv >= 0) || (du < 0 && dv < 0))
            return Math.max(Math.abs(du), Math.abs(dv));
        else
            return Math.abs(du) + Math.abs(dv);
    }

    static orderBy(list, callback) {
        const itms = [];
        for (var i = 0; i < list.length; i++) {
            const obj = list[i];
            itms.push({item: obj, val: callback(obj)});
        }
        itms.sort((a, b) => (a.val - b.val));
        list = [];
        for (var i = 0; i < itms.length; i++) {
            const obj1 = itms[i];
            list.push(obj1.item);
        }
        return list;
    }


    static mathSign(f: number) {
        if (f < 0) return -1;
        else if (f > 0) return 1;
        return 0;
    }

    static getDirection(p1: Vector3d, p2: Vector3d): Direction {
        console.log('x1', p1.x, 'x2', p2.x, 'y1', p1.z, 'y2', p2.z);
        if (p1.x > p2.x) {
            if (p1.z == p2.z) {
                return Direction.BottomLeft;
            } else {
                if (p1.z < p2.z) {
                    return Direction.TopLeft;
                } else {
                    return Direction.BottomLeft;
                }
            }
        } else if (p1.x < p2.x) {
            if (p1.z == p2.z) {
                console.log('a');
                return Direction.TopRight;
            } else {
                if (p1.z < p2.z) {
                    console.log('b');
                    return Direction.BottomRight;
                } else {
                    console.log('c');
                    return Direction.TopRight;
                }
            }
        } else {
            if (p1.z < p2.z) {
                return Direction.Bottom;
            } else {
                return Direction.Top;
            }
        }
    }
}

enum Direction{
    TopLeft = 0,
    Top = 1,
    TopRight = 2,
    BottomRight = 3,
    Bottom = 4,
    BottomLeft = 5
}