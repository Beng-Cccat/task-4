import { defineStore } from 'pinia';

interface ObjectList {
    [key: string]: string[];
}

export const usePermissStore = defineStore('permiss', {
    state: () => {
        const defaultList: ObjectList = {
            developer: [
                '0',
                '1',
                '11',
                '12',
                '13',
                '2',
                '21',
                '22',
                '23',
                '24',
                '25',
                '26',
                '27',
                '28',
                '29',
                '291',
                '292',
                '3',
                '31',
                '32',
                '33',
                '34',
                '4',
                '41',
                '42',
                '5',
                '7',
                '6',
                '61',
                '62',
                '63',
                '64',
                '65',
                '66',
                '001',
                '002',
                '003',
            ],
            // 权限管理设置
            admin: ['0', '7', '1', '11', '12', '001'],
            analyst: ['0', '001', '003'],
            farmer: ['0', '001', '002'],
            user: ['0', '001'],
        };
        return {
            key: [] as string[],
            defaultList,
        };
    },
    actions: {
        handleSet(val: string[]) {
            console.log(`Permiss ${this.key} change to ${val}`);
            this.key = val;
        },
    },
    persist: true
});
