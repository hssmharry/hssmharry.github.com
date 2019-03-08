$(() => {
  lol.common.ready();
});

const SORTING_TYPE = {TEXT:'TEXT', NUMBER:'NUMBER', DATE:'DATE', FULL_NAME:'FULLNAME', KDA:'KDA'};
const ORDER = {ASC:'ASC', DESC:'DESC'}
let lol = {};
lol.common = {
  ready() {
    this.init.all();
    this.event();
  },

  event() {
    $('#container').on('click', '.actionBtn', $.proxy(lol.common.click.actionBtn, this));
  },

  init: {
    all() {

    }
  },

  click: {
    actionBtn(e) {
        const action = $(e.target).data('action');
        let targetFun = lol;
        action.split('.').forEach(v => {
          targetFun = targetFun[v] || targetFun;
        });
        targetFun(e);
    }
  },

  sort(list, type, prop, order) {
    return list.sort((a, b) => {
                var aValue = lol.common.checkSortingType(type, a[prop]);
                var bValue = lol.common.checkSortingType(type, b[prop]);

                if(order === ORDER.ASC) {
                    return (aValue > bValue) ? 1 : (aValue < bValue ? -1 : 0);
                } else if(order === ORDER.DESC) {
                    return (bValue > aValue) ? 1 : (bValue < aValue ? -1 : 0);
                }
            });
  },

    checkSortingType(type, value) {
        switch(type) {
            case SORTING_TYPE.TEXT:
                return parseInt(value);
                break;
            case SORTING_TYPE.NUMBER:
                return parseInt(value);
                break;
            case SORTING_TYPE.KDA:
                return lol.common.calKDA(value);
                break;
            default:
                return value;
        }
    },

    appendComma: function (parts) {
        let commaVal = '';
        if (parts.length == 1) {
            commaVal = `${parts[0].replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')}`;
        } else if (parts.length == 2) {
            commaVal = `${parts[0].replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')}.${parts[1]}`;
        } else {
            commaVal = '';
        }
        return commaVal;
    },

    calKDA(value) {
        const kdaList = value.split('/').map(v => parseInt(v));
        const kda = (kdaList[0] + kdaList[2]) / kdaList[1];
        return ((kdaList[0] + kdaList[2]) % kdaList[1]) === 0 ? kda : kda.toFixed(1);
    }
};
