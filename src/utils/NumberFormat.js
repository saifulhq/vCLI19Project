/**
 * 
 * @param {*} num 
 * @param {*} options {
 *      thousandSeparator: boolean = TRUE
 *      symbol: boolean = FALSE
 * } atau check _default value
 * @returns 
 */
export function currencyFormat(num, options = {}) {
    const _default = {
        thousandSeparator: true,
        symbol: true
    };
    const opt = { ..._default, ...options };

    return `${!!opt.symbol ? 'Rp. ' : ''}` + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

/**
 * 
 * @param {*} num 
 * @param {*} opt {
 *      thousandSeparator: boolean = TRUE
 *      fixed: number = 0
 *      
 * }
 * @returns 
 */
export function numberFormat(num, opt = {}) {
    const fixed = opt.fixed || 0;
    return num.toFixed(fixed).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}