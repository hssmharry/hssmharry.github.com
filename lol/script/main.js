/**
 * Created by misol park
 */

$(() => {
  const MAX_PAGE = $('#content .page').length;
  const APPKEY = '5375ce90a3391fd48845519304e83309';
  let PAGE = 1;

  lol.main = {
    DATA: null,
    ready() {
      this.init.all();
      this.event();
    },

    event() {
    },

    init: {
      all() {
        this.loadJSON();
        this.setGameTable();
      },

      loadJSON() {
        lol.main.DATA = JSON.parse(`[{"date":"2018-10-25","games":[{"lose":{"members":[{"summoner":"미솔","champion":"럭스","kda":"1/2/2","cs":"209","damage":"9597","receiveDamage":"6725","sight":"19"},{"summoner":"하니마","champion":"바루스","kda":"1/6/1","cs":"208","damage":"7896","receiveDamage":"12242","sight":"18"},{"summoner":"잘나가는형아","champion":"문도","kda":"1/3/0","cs":"120","damage":"6238","receiveDamage":"14180","sight":"8"},{"summoner":"싸락골멍멍개","champion":"녹턴","kda":"2/7/1","cs":"81","damage":"5397","receiveDamage":"19381","sight":"10"}]},"win":{"members":[{"summoner":"오예아예","champion":"신짜오","kda":"7/1/4","cs":"116","damage":"8897","receiveDamage":"9835","sight":"49"},{"summoner":"xavy","champion":"럼블","kda":"2/2/4","cs":"151","damage":"14782","receiveDamage":"902","sight":"49"},{"summoner":"영진킴","champion":"이렐리아","kda":"5/1/1","cs":"141","damage":"4923","receiveDamage":"4669","sight":"25"},{"summoner":"요시카와","champion":"시비르","kda":"4/1/5","cs":"150","damage":"6998","receiveDamage":"2960","sight":"23"}]}},{"win":{"members":[{"summoner":"하니마","champion":"피오라","kda":"10/6/9","cs":"225","damage":"29806","receiveDamage":"12619","sight":"41"},{"summoner":"싸락골멍멍개","champion":"아무무","kda":"4/6/18","cs":"162","damage":"13691","receiveDamage":"34431","sight":"16"},{"summoner":"잘나가는형아","champion":"징크스","kda":"9/6/12","cs":"213","damage":"23798","receiveDamage":"22413","sight":"18"},{"summoner":"미솔","champion":"자이라","kda":"7/4/20","cs":"219","damage":"42353","receiveDamage":"17517","sight":"16"}]},"lose":{"members":[{"summoner":"xavy","champion":"베인","kda":"7/9/5","cs":"209","damage":"22366","receiveDamage":"30144","sight":"24"},{"summoner":"요시카와","champion":"레넥톤","kda":"5/7/6","cs":"208","damage":"15970","receiveDamage":"40722","sight":"35"},{"summoner":"오예아예","champion":"노틸러스","kda":"1/7/10","cs":"168","damage":"16562","receiveDamage":"30793","sight":"31"},{"summoner":"영진킴","champion":"킨드레드","kda":"9/7/5","cs":"222","damage":"26942","receiveDamage":"34626","sight":"49"}]}}]}]`);

        // $.getJSON('./json/games.json', (data) => {
        //   console.log(data);
        // });
      },

      setGameTable(tableId, index, prop, order) {
        $('#content').empty();

        const dataSortType = {summoner:SORTING_TYPE.TEXT, champion:SORTING_TYPE.TEXT, kda:SORTING_TYPE.KDA, cs:SORTING_TYPE.NUMBER, damage:SORTING_TYPE.NUMBER, receiveDamage:SORTING_TYPE.NUMBER, sight:SORTING_TYPE.NUMBER};
        const isWinTable = tableId ? tableId.includes('win') : null;
        const $frag = $(document.createDocumentFragment());
        lol.main.DATA.forEach(data => {
          const date = data.date;
          const games = data.games;
          $frag.append(template.gameDate(date));
          games.forEach((game, i) => {
            const defaultProp = 'summoner';
            const deraultOrder = ORDER.ASC;
            const matchIndex = index > 0 ? index === i+1 : false;
            const sortInfo = {};
            sortInfo[prop] = order;

            const data = {
              win: {
                prop: isWinTable && matchIndex ? prop : defaultProp,
                order: isWinTable && matchIndex ? order : deraultOrder,
                sortInfo: isWinTable && matchIndex ? sortInfo : {}
              },
              lose: {
                prop: !isWinTable && matchIndex ? prop : defaultProp,
                order: !isWinTable && matchIndex ? order : deraultOrder,
                sortInfo: !isWinTable && matchIndex ? sortInfo : {}
              }
            };

            const winTr = lol.common.sort(game.win.members,
                                          dataSortType[data.win.prop] || SORTING_TYPE.TEXT,
                                          data.win.prop,
                                          data.win.order)
                             .map(member => {
                               $.each(member, (i, v) => {
                                  if (dataSortType[i] === SORTING_TYPE.NUMBER) {
                                    member[i] = lol.common.appendComma([v]);
                                  }
                               });
                               return template.gameTableTbody(member);
                             }).join('');
            const loseTr = lol.common.sort(game.lose.members,
                                          dataSortType[data.lose.prop] || SORTING_TYPE.TEXT,
                                          data.lose.prop,
                                          data.lose.order)
                              .map(member => {
                                  $.each(member, (i, v) => {
                                      if (dataSortType[i] === SORTING_TYPE.NUMBER) {
                                          member[i] = lol.common.appendComma([v]);
                                      }
                                  });
                                  return template.gameTableTbody(member);
                              }).join('');;

            const winTable = template.gameTable('win', winTr, i, data.win.sortInfo);
            const loseTable = template.gameTable('lose', loseTr, i, data.lose.sortInfo);
            const gameWrap = template.gameWrap(i+1, winTable, loseTable);
            $frag.append(gameWrap);
          });
        });

        $('#content').append($frag);
      }
    },

    sortTh(e) {
      console.log('th >_<', $(e.target).find('.sortBtn'));
      lol.main.sort({target: $(e.target).find('.sortBtn')[0]});
    },

    sort(e) {
      const order = $(e.target).data('order') === ORDER.ASC ? ORDER.DESC : ORDER.ASC;
      const prop = $(e.target).data('prop');
      const id = $(e.target).parents('.game_table').attr('id');
      const index = $(e.target).parents('.game_table').data('index') + 1;

      lol.main.setSortInfo(e, order);
      lol.main.init.setGameTable(id, index, prop, order);
    },

    setSortInfo(e, order) {
        $(e.target).data('order', order);
    }
  };

  lol.main.ready();
});
