const template = {
  sortBtn() {
    return ``;
  },

  gameTable(type, tbody, index, sortInfo) {
    return `<table class="game_table ${type}" id="${type}_${index}" data-index="${index}">
              <thead>
                <tr>
                  <th class="asc">소환사명${this.sortBtn('summoner', sortInfo)}</th>
                  <th class="asc">챔피언${this.sortBtn('champion', sortInfo)}</th>
                  <th class="asc">KDA${this.sortBtn('kda', sortInfo)}</th>
                  <th class="asc">CS${this.sortBtn('cs', sortInfo)}</th>
                  <th class="asc">딜량${this.sortBtn('damage', sortInfo)}</th>
                  <th class="asc">받은피해${this.sortBtn('receiveDamage', sortInfo)}</th>
                  <th class="asc">시야${this.sortBtn('sight', sortInfo)}</th>
                </tr>
              </thead>
              <tbody>
                ${tbody}
              </tbody>
            </table>`;
  },

  gameTableTbody(info) {
    return `<tr>
              <td>${info.summoner}</td>
              <td>${info.champion}</td>
              <td>${info.kda}</td>
              <td>${info.cs}</td>
              <td>${info.damage}</td>
              <td>${info.receiveDamage}</td>
              <td>${info.sight}</td>
            </tr>`;
  },

  gameWrap(gameNo, winTable, loseTable) {
    return `<div class="game_wrap">
              <div class="game_no">${gameNo}</div>
              <div class="game_table_wrap">
                ${winTable}
                ${loseTable}
              </div>
            </div>`;
  },

  gameDate(date) {
    return `<div class="game_date">${date}</div>`;
  },

  sortBtn(prop = '', sortInfo = {}) {
    const order = sortInfo[prop] ? sortInfo[prop] : ORDER.ASC;
    return `<span class="actionBtn sortBtn" data-action="main.sort" data-prop="${prop}" data-order="${order}"></span>`;
  }
};
