export const studiesDictionary = {
    rightClickMenu: {
        duplicate: 'Duplicate',
        settings: 'Settings',
        clearIndicators: 'Clear indicators',
    },
    td_sequential: {
        title: 'TD Sequential',
        description: 'TD Sequential is an indicator that helps identify uptrend/downtrend exhaustion or potential reversal price points. The indicator comprise two price sequences – TD Setup (the first one) which is a prerequisite for the TD Countdown (the second sequence). The TD Setup sequence is calculated as the difference between the current Close and the corresponding Close four bars earlier. TD Setup is considered completed after it takes 9 consecutive bars in a row, that means the reversal is about to take place. Then, the TD Countdown sequence starts. It is calculated as the difference between the current Close with the low/high two bars earlier. The TD Countdown sequence is considered completed after it takes 13 consecutive bars in a row, that also may indicate an upcoming price reversal.',
        tdSequential: {
            tdSequential: 'TDS',
        },
    },
    adx: {
        title: 'Average Directional Movement Index',
        description: "Average Directional Movement Index (ADX) is an indicator that measures the overall strength of a trend. Being a component of the Directional Movement System, ADX combines and smooths (by Moving Average) the result of two other indicators: the positive directional indicator (DMI+) and negative directional indicator (DMI-). The indicator line fluctuates in the range from 0 to +100, whereby the readings below 20 indicate trend's weakness, and readings above 40 indicate trend's strength.",
        adx: {
            title: 'ADX',
        },
    },
    wave_trend: {
        title: 'WaveTrend',
        description: `WaveTrend (WT) is an oscillator that follows the price swings and indicates when the market conditions are overbought/oversold. The WT plots two waves with highs (appear as a line) and lows (appear as dots) oscillating below/above the zero level. The oscillator also provides overbought/oversold levels (-60 and +60) and additional signal levels (-50 and +50) that appear as dots. When one of the oscillator's wave is above the overbought level and crosses down the signal level, it is considered a sell signal. Similarly, when one of the oscillator's wave is below the oversold level and crosses above the signal level, it is considered a buy signal. Additionally, WT plots the Wave Difference plot that shows the relationship between the high and low prices over specified period.`,
        zero: {
            title: 'Zero',
        },
        ob1: {
            title: 'Over Bought Level 1',
        },
        ob2: {
            title: 'Over Bought Level 2',
        },
        os1: {
            title: 'Over Sold Level 1',
        },
        os2: {
            title: 'Over Sold Level 2',
        },
        wt1: {
            title: 'Wave Trend 1',
        },
        wt2: {
            title: 'Wave Trend 2',
        },
        wtDiff: {
            title: 'Wave Difference',
        },
    },
    adxr: {
        title: 'Average Directional Movement Index Rating',
        description: 'Average Directional Movement Index Rating (ADXR) is a study that reflects strengthening and weakening of a trend. ADXR uses the smoothed out Average Directional Movement Index (ADX) for calculation: it takes the average value of the current ADX and the ADX value n-periods ago.',
        adx: {
            title: 'ADX',
        },
        adxr: {
            title: 'ADXR',
        },
    },
    acceleration_deceleration: {
        title: 'Acceleration/Deceleration',
        description: "Acceleration/Deceleration (AC) is a histogram-type oscillator that quantifies the current market momentum. The longer the bars are, the greater the market momentum's acceleration/deceleration, and vice versa. The AC values are calculated as the difference between Awesome Oscillator (AO) and its 5-period Simple Moving Average (SMA).",
        ad: {
            title: 'A/D',
        },
        zero: {
            title: 'Zero',
        },
    },
    accumulation_swing_index: {
        title: 'Accumulation Swing Index',
        description: 'Accumulation Swing Index (ASI) is a momentum oscillator calculated as a sum of all previous values (running total) of the Swing Index. The oscillator plots a line above and below the zero level: the line moves up – an uptrend prevails, the line moves down – a downtrend prevails. The farther away it moves from the zero line, the stronger the price momentum is.',
        asi: {
            title: 'ASI',
        },
        zero: {
            title: 'Zero',
        },
    },
    accumulation_distribution: {
        title: 'Accumulation/Distribution',
        description: "Accumulation/Distribution (AD) is a volume oscillator that helps identify whether an asset is being accumulated (buying pressure prevails on the instrument) or distributed (selling pressure prevails on the instrument). The oscillator values are calculated as the difference between the highest and lowest prices of a specified number of periods multiplied by the period's volume of ticks.",
        acc_dist: {
            title: 'AccDist',
        },
        zero: {
            title: 'Zero',
        },
    },
    aroon_indicator: {
        title: 'Aroon Indicator',
        description: 'Aroon Indicator is a study comprising two plots. The first one (Aroon Up) measures the number of periods between the highest prices reached in every specified time period. The other one (Aroon Down) measures the number of periods between the lowest prices reached in every specified time period. The plots help identify bullish (Aroon Up > Aroon Down) or bearish (Aroon Up < Aroon Down) price behavior on the charts.',
        aroon_up: {
            title: 'AroonUp',
        },
        aroon_down: {
            title: 'AroonDown',
        },
        over_bought: {
            title: 'OverBought',
        },
        over_sold: {
            title: 'OverSold',
        },
    },
    aroon_oscillator: {
        title: 'Aroon Oscillator',
        description: 'Aroon Oscillator is a study that uses Aroon Indicator to quantify the strength of the current trend and the possibility of its further strengthening. The Aroon Oscillator is calculated as the difference between Aroon Up and Aroon Down. Fluctuating in a range from -100 to +100, high oscillator values indicate an uptrend while the low ones indicate a downtrend.',
        aroon_oscillator: {
            title: 'AroonOscillator',
        },
        mid_line: {
            title: 'MidLine',
        },
        over_bought: {
            title: 'OverBought',
        },
        over_sold: {
            title: 'OverSold',
        },
    },
    average_true_range: {
        title: 'Average True Range',
        description: 'Average True Range (ATR) is a study that measures volatility of the market prices (including gaps in price movements) and plots it on the chart as a moving average of the true ranges over a period. True range is taken as the largest value of the following differences: the difference between the current high and the current low, the difference between the current high and the previous close and the difference between the previous close and the current low',
        atr: {
            title: 'ATR',
        },
    },
    awesome_oscillator: {
        title: 'Awesome Oscillator',
        description: 'Awesome Oscillator (AO) is a histogram-type study that measures the market momentum and represents it as histogram bars above or below the zero line. The longer the bars, the greater the market momentum, and vice versa. The AO values are calculated as the difference between 34-period and 5-period Simple Moving Averages (SMA).',
        awesome_osc: {
            title: 'AwesomeOsc',
        },
        zero: {
            title: 'Zero',
        },
    },
    bollinger_bands: {
        title: 'Bollinger Bands',
        description: 'Bollinger Bands (BB) is a technical analysis tool that helps monitor price volatility. BB plots a Simple Moving Average (SMA) and two standard deviations above and below the SMA as overbought and oversold levels. The greater the price deviation from the moving average, the higher the volatility.',
        lower_band: {
            title: 'LowerBand',
        },
        mid_line: {
            title: 'MidLine',
        },
        upper_band: {
            title: 'UpperBand',
        },
    },
    cci: {
        title: 'Commodity Channel Index',
        description: "Commodity Channel Index (CCI) is a momentum oscillator that represents security price's variation calculated from its statistical mean (average absolute deviation). To plot the variation, CCI first calculates the difference between a Typical Price (arithmetic average of the high, low, and close prices) and its Simple Moving Average (SMA). Then, the study divides the result by the statistical mean of the typical price. CCI has two adjustable overbought and oversold levels and the zero line. When the oscillator's line moves above the zero line, it indicates strengthening of the market momentum. Moving below the zero line indicates the market momentum weakening.",
        cci: {
            title: 'CCI',
        },
        zero: {
            title: 'Zero',
        },
        over_bought: {
            title: 'OverBought',
        },
        over_sold: {
            title: 'OverSold',
        },
    },
    csi: {
        title: 'Commodity Selection Index',
        description: 'Commodity Selection Index (CSI) is a technical momentum indicator that helps select commodities suitable for short-term trading based on their CSI values. The larger the value, the more suitable the commodity is. To calculate the values, the indicator multiplies Average Directional Movement Rating (ADR) and Average True Range (ATR) by a constant that incorporates the Big Point Value (1 full point of price movement represented in dollars), initial margin requirements, and the commission.',
        csi: {
            title: 'CSI',
        },
    },
    center_of_gravity_oscillator: {
        title: 'Center Of Gravity Oscillator',
        description: 'Center of Gravity Oscillator (COG) is a study that can help clearly identify the price turning points: smoothed out oscillator provides indications with almost zero lag. COG values are calculated as the sum of the current prices divided by its average over a defined period.',
        cog: {
            title: 'COG',
        },
    },
    chaikin_oscillator: {
        title: 'Chaikin Oscillator',
        description: "Chaikin Oscillator (CHO) is a study used to confirm the price movement. The oscillator's values are calculated as the difference between the fast and slow EMAs of Accumulation/Distribution (A/D). A sum of all previous CHO values (a running total) forms a line that moves above or below the zero level: the line moves up - the buying (accumulation) pressure prevails, the line moves down - the selling (distribution) pressure prevails.",
        chaikin_osc: {
            title: 'ChaikinOsc',
        },
        zero: {
            title: 'Zero',
        },
    },
    chaikin_volatility: {
        title: 'Chaikin Volatility',
        description: "The Chaikin Volatility (CHV) study is a technical indicator that measures volatility by comparing the spread between security's High and Low prices over a period (not including gaps in price movements). CHV is calculated as the difference between two EMAs of a volume-weighted Accumulation/Distribution (A/D) line.",
        chaikin_vlt: {
            title: 'ChaikinVlt',
        },
        zero: {
            title: 'Zero',
        },
    },
    chande_momentum_oscillator: {
        title: 'Chande Momentum Oscillator',
        description: "Chande Momentum Oscillator (CMO) is a study used to help monitor the speed at which the price changes. CMO first calculates the difference between the sum of gains and the sum of losses. Then, the study divides that difference by the sum of all price movements over the given period. The oscillator's values are presented on the -100 to +100 scale with the zero line and oversold/overbought levels equal to -50 and +50 respectively.",
        cmo: {
            title: 'CMO',
        },
        zero: {
            title: 'Zero',
        },
        upper_level: {
            title: 'UpperLevel',
        },
        lower_level: {
            title: 'LowerLevel',
        },
    },
    kama: {
        title: 'Kaufman Adaptive Moving Average',
        description: 'The Kaufman Adaptive Moving Average (KAMA) study is a moving average indicator that becomes more sensitive and adds extra weight to its average value when the market prices are steadily moving in a certain direction.',
        kama: {
            title: 'KAMA',
        },
    },
    dema: {
        title: 'Double Exponential Moving Average',
        description: 'Double Exponential Moving Average (DEMA) is a smoothed moving average that results less lag than a traditional Exponential Moving Average (EMA). DEMA is calculated as the difference between doubled value of EMA and the moving average of that EMA.',
        dema: {
            title: 'DEMA',
        },
    },
    dmi: {
        title: 'Directional Movement Index',
        description: "Directional Movement Index (DX) is a study that measures both the overall strength and direction of a trend. As a component of the Directional Movement System, DX comprises an Average Directional Movement Index (ADX) which is a smoothed version of DX, and two standard indicators: positive directional indicator (DI+) and negative directional indicator (DI-). The larger the spread between DI+ and DX-, the stronger the price trend is. The spread is represented by DX line fluctuating on the 0 to +100 scale, whereby the readings above 25 indicate trend's strength.",
        di_minus: {
            title: 'DI-',
        },
        di_plus: {
            title: 'DI+',
        },
        adx: {
            title: 'ADX',
        },
    },
    day_open_close: {
        title: 'Day Open-Close',
        description: 'The Day Open-Close study draws two plots highlighting the Open and Close prices for a specified aggregation period. The plots can reflect the prices whether for the whole chart or for the last aggregation period only.',
        daily_open: {
            title: 'DailyOpen',
        },
        daily_close: {
            title: 'DailyClose',
        },
    },
    demarker: {
        title: 'DeMarker',
        description: 'DeMarker (DeM) is a technical indicator that derives its values by comparing the most recent maximum and minimum prices with the equivalent prices of the previous period. The indicator attempts to assess the directional bias of the market, so it can be used to determine either when to enter a market, or when to buy or sell an asset.',
        demarker: {
            title: 'DeMarker',
        },
    },
    detrended_price_osc: {
        title: 'Detrended Price Osc',
        description: 'Detrended Price Oscillator (DPO) is a study that attempts to eliminate long-term trends from prices and leave only underlying price cycles. DPO is calculated by subtracting Simple Moving Average (SMA) from the selected price.',
        dpo: {
            title: 'DPO',
        },
        zero_line: {
            title: 'ZeroLine',
        },
    },
    dynamic_momentum_index: {
        title: 'Dynamic Momentum Index',
        description: 'The Dynamic Momentum Index (DYMI) study is very similar to Relative Strength Index (RSI). The only difference is that DYMI uses variable time periods (from 3 to 30) while RSI has a fixed number of them (usually 14). Controlling the number of time periods, DYMI becomes more sensitive to short-term moves than RSI: the more volatile the price, the shorter the time period is.',
        dymi: {
            title: 'DYMI',
        },
        over_bought: {
            title: 'OverBought',
        },
        over_sold: {
            title: 'OverSold',
        },
    },
    ema: {
        title: 'Exponential Moving Average',
        description: 'Exponential Moving Average (EMA) is a Simple Moving Average (SMA) that adds some extra value (weight) to the price for the calculated period. It allows to reflect market price changes more sensitively: EMA responds faster and makes the lag less significant than in a SMA.',
        avg_exp: {
            title: 'AvgExp',
        },
    },
    ema_envelope: {
        title: 'Exponential Moving Average Envelope',
        description: 'Exponential Moving Average Envelope (EMA Envelope) is a trend-based indicator that plots two Exponential Moving Averages (EMAs) as upper and lower bands over a price chart. The bands can be used as oversold and overbought levels respectively.',
        upper_band: {
            title: 'UpperBand',
        },
        lower_band: {
            title: 'LowerBand',
        },
    },
    elder_ray: {
        title: 'Elder Ray',
        description: 'Elder Ray is a technical indicator that measures the buying and selling pressure in the market. It comprises BullPower and BearPower indicators that derive from 13-period EMA and fluctuate above or below the zero line. Measuring the deviation of High/Low prices from the average price, BullPower and BearPower represent bullish or bearish strength in the market respectively.',
        bull_power: {
            title: 'BullPower',
        },
        bear_power: {
            title: 'BearPower',
        },
        zero: {
            title: 'Zero',
        },
    },
    fast_stochastic: {
        title: 'Fast Stochastic',
        description: 'The Fast Stochastic study is a momentum oscillator that identifies the market strength by comparing the closing price of a security with its price range over period of time. Fast Stochastic is bounded to the range from 0 to +100 and is consisted of two lines: FastK and its smoothed version FastD. Crossover of either lines with overbought/oversold levels generates sell (above 80) and buy (below 20) signals respectively.',
        fast_k: {
            title: 'FastK',
        },
        over_bought: {
            title: 'OverBought',
        },
        over_sold: {
            title: 'OverSold',
        },
        fast_d: {
            title: 'FastD',
        },
    },
    fibonacci_bb: {
        title: 'Fibonacci Bollinger Bands',
        description: 'Fibonacci Bollinger Bands is an indicator that combines Bollinger Bands (BB) with the Fibonacci sequence concept, a distinct pattern of numbers used for calculation of standard deviation levels (bands). The bands (the number is customizable) deviate from Simple Moving Average (SMA), showing possible support and resistance areas or offering potential entry points.',
        plot: {
            title: 'Plot',
        },
        upper1: {
            title: '0.236-U',
        },
        upper2: {
            title: '0.382-U',
        },
        upper3: {
            title: '0.5-U',
        },
        upper4: {
            title: '0.618-U',
        },
        upper5: {
            title: '0.764-U',
        },
        upper6: {
            title: '1-U',
        },
        lower1: {
            title: '0.236-L',
        },
        lower2: {
            title: '0.382-L',
        },
        lower3: {
            title: '0.5-L',
        },
        lower4: {
            title: '0.618-L',
        },
        lower5: {
            title: '0.764-L',
        },
        lower6: {
            title: '1-L',
        },
    },
    force_index: {
        title: 'Force Index',
        description: "Force Index (FI) is a technical indicator that uses price and volume to quantify the power behind an asset's price movement. FI is calculated as the volume for a specified period multiplied by the difference between the current prices and a prior price. The high positive values indicate a strong rising trend, and low values signify a strong downward trend.",
        force_index: {
            title: 'ForceIndex',
        },
        zero: {
            title: 'Zero',
        },
    },
    forecast_oscillator: {
        title: 'Forecast Oscillator',
        description: "Forecast Oscillator (FOSC) attempts to forecast price movements using the Time Series Forecast (TSF) study for calculation. FOSC is calculated as the difference (in percent) of the actual closing price with the TSF's value of that close. FOCS provides a zero line along with the signal line which is an Exponential Moving Average (EMA) of Forecast Oscillator. Crossover of the FOSC line and its signal line indicates that the prices are expected to rise (FOCS above the signal line) or the prices are expected to fall (FOCS below the signal line).",
        fo_sc: {
            title: 'FOsc',
        },
        signal: {
            title: 'Signal',
        },
        zero: {
            title: 'Zero',
        },
    },
    full_stochastic: {
        title: 'Full Stochastic',
        description: `The Full Stochastic study is a generalized version of the two other oscillators: Fast Stochastic and Slow Stochastic. Likewise Fast Stochastic and Slow Stochastic, the study identifies the market strength by comparing the closing price of a security with its price range over a period of time. The oscillator is bounded to the range from 0 to +100 and is consisted of two plots: FullK and its smoothed version FullD. Crossover of either lines with overbought/oversold levels generates sell (above 80) and buy (below 20) signals respectively. 

		Default settings of the Full Stochastic study makes it neither Slow nor Fast but an average version in comparison with the Fast Stochastic and Slow Stochastic oscillators. Customize the number of periods of the FullK and FullD plots in settings to make it act closer either to the Slow or Fast version.`,
        full_k: {
            title: 'FullK',
        },
        over_bought: {
            title: 'OverBought',
        },
        over_sold: {
            title: 'OverSold',
        },
        full_d: {
            title: 'FullD',
        },
    },
    gator_oscillator: {
        title: 'Gator Oscillator',
        description: "Gator Oscillator helps detect trend changes of an asset's price. The oscillator shows the convergence/divergence's absolute degree for the three moving averages from Williams Alligator. Gator Oscillator's values are utilized in histogram bars above or below the zero line: the upper histogram represents the difference between Jaw and Teeth plots, the lower histogram represents the difference of Teeth and Lips.",
        histogram1: {
            title: 'Histogram1',
        },
        histogram2: {
            title: 'Histogram2',
        },
        zero: {
            title: 'Zero',
        },
    },
    hl_volatility: {
        title: 'High-Low Volatility',
        description: 'The High-Low Volatility study measures price volatility in a specific way: it considers min and max price values for a given period and relates them to the current price. The values are calculated as a percentage ratio of two EMAs, EMA1 for the difference between highest high and lowest low prices, and EMA2 for the current close.',
        h_l_vlt: {
            title: 'H-LVlt',
        },
        zero: {
            title: 'Zero',
        },
    },
    ichimoku: {
        title: 'Ichimoku',
        description: `The Ichimoku study is a technical analysis tool that provides a complete picture of the market setup. It is used to monitor the market momentum, define the support and resistance levels, and detect price trend: the direction and strength. The study consists of the following plots:

		• TenkanSen (conversion or turning line) - trend indicator, the most sensitive 9-period moving average of the Ichimoku lines.
		• KijunSen (baseline) - trend indicator, a 26-period moving average.
		• ChikouSpan (lagging line) - moving average of the TenkanSen and KijunSen indicators.
		• SenkouSpanA (leading line A) - 52-period moving average.
		• SenkouSpanB (leading line B) - close price plotted 26 periods back.

		The KijunSen and TenkanSen lines help identify the trend and its direction respectively: when the price is above KijunSen, prices will likely keep going up, and vice versa. A buy signal is generated when the ChikouSpan line crosses over the price, or when the TenkanSen crosses over the KijunSen. A sell signal is generated when the ChinkouSpan line crosses under the price, or when the TenkanSen crosses under the KijunSen. The price movement can be confirmed when both crosses occur. 
		
		The SenkouSpanA and SenkouSpanB lines show expected trend behavior and can be used as support and resistance levels. The space between them is called Cloud, and is graphed in a hatched pattern. `,
        tenkan_sen: {
            title: 'tenkanSen',
        },
        kijun_sen: {
            title: 'kijunSen',
        },
        chikou_span: {
            title: 'chikouSpan',
        },
        senkou_span_a: {
            title: 'senkouSpanA',
        },
        senkou_span_b: {
            title: 'senkouSpanB',
        },
    },
    inertia: {
        title: 'Inertia',
        description: "Inertia is an indicator that helps determine the prevailing price trend. The indicator uses the linear regression algorithm to plot a curve based on Relative Volatility Index (RVI). The curve's values are utilized on the scale from 0 to +100, where 50 is a neutral level. When the readings are greater than 50, the market is considered uptrend, and when the readings are lower than 50, it is considered downtrend.",
        inertia: {
            title: 'Inertia',
        },
        middle: {
            title: 'Middle',
        },
    },
    intraday_momentum_index: {
        title: 'Intraday Momentum Index',
        description: "The Intraday Momentum Index (IMI) study is a version of Relative Strength Index (RSI) that considers the relationship between a security's Open and Close prices instead of difference between the close and previous close, which is used in RSI. The IMI's line can help identify when a security is overbought (the line is above 70) or oversold (the line is below 30).",
        imi: {
            title: 'IMI',
        },
        over_bought: {
            title: 'OverBought',
        },
        over_sold: {
            title: 'OverSold',
        },
    },
    kairi_relative_index: {
        title: 'Kairi Relative Index',
        description: "Kairi Relative Index (KRI) is a momentum oscillator that measures the deviation of the closing price from Simple Moving Average (SMA) over a specific period of time. The KRI's line oscillates above or below the zero level, the extreme readings indicate oversold and overbought conditions and possible trend reversals.",
        kri: {
            title: 'KRI',
        },
        zero: {
            title: 'Zero',
        },
    },
    keltner_channels: {
        title: 'Keltner Channels',
        description: "Keltner Channels are volatility-based lines (upper and lower bands) placed above and below either side of an asset's price with Exponential Moving Average (EMA) as the middle line. The distance between the bands and the moving average is equal to the Average True Range (ATR) indicator's value multiplied by 2 by default. The Keltner Channels study is used to determine the direction of the trend: price that reaches the upper band gives the bullish signal, while price reaching the lower band gives the bearish one.",
        upper_band: {
            title: 'UpperBand',
        },
        mid_line: {
            title: 'MidLine',
        },
        lower_band: {
            title: 'LowerBand',
        },
    },
    linear_regression_channel: {
        title: 'Linear Regression Channel',
        description: 'Linear Regression Channel is a study used to analyze the upper and lower limits of an existing trend. The channel consists of three lines: upper channel and lower channel lines that mark the top and bottom of the trend, and linear regression line, which is used to determine the trend direction. The linear regression line is based on the linear regression algorithm which makes the line more responsive to the prices than the classic moving averages. The prices above the linear regression line make up the bearish trend, and the ones below the linear regression line indicate the bullish trend.',
        lower: {
            title: 'Lower',
        },
        lin_reg: {
            title: 'LinReg',
        },
        upper: {
            title: 'Upper',
        },
    },
    linear_regression_curve: {
        title: 'Linear Regression Curve',
        description: 'Linear Regression Curve (LRC) is a moving average based on the linear regression algorithm which makes the line more responsive to the prices than the classic moving averages.',
        linear_regression: {
            title: 'LinearRegression',
        },
    },
    linear_regression_slope: {
        title: 'Linear Regression Slope',
        description: 'Linear Regression Slope (LRS) is an oscillator based on the linear regression algorithm which makes the line more sensitive to the price changes. The normalized slope value reflects the strength of the trend, where positive values generally make up an uptrend and negative values can be considered as a downtrend.',
        linear_regression_slope: {
            title: 'LinearRegressionSlope',
        },
    },
    macd: {
        title: 'Moving Average Convergence/Divergence',
        description: 'Moving Average Convergence Divergence (MACD) is a trend-following momentum indicator that is calculated as the difference between 26-period and 12-period EMAs. MACD also provides a signal line, the average of that difference. The indicator triggers when MACD plot crosses above (buy) or below (sell) the signal line.',
        value: {
            title: 'Value',
        },
        avg: {
            title: 'Avg',
        },
        diff: {
            title: 'Diff',
        },
    },
    market_facilitation_index: {
        title: 'Market Facilitation Index',
        description: `The Market Facilitation Index (MFI) helps predict trend continuation or reversals by measuring an asset's price that should be interpreted in connection with the volume changes. There are 4 situations available:

		• MFI increases and the volume increases - the trend continuation
		• MFI decreases and the volume decreases - the market participants lost interest
		• MFI increases, the volume decreases - upcoming trend reversal
		• MFI decreases, the volume increases - both trend continuation and reversal are possible
		
		The Market Facilitation Index is calculated as the difference between the day's low and the high divided by the total volume.`,
        mfi_dx: {
            title: 'MFIdx',
        },
    },
    mass_index: {
        title: 'Mass Index',
        description: 'Mass Index is a study that helps identify trend reversals. It is calculated as the sum of 9-bar Exponential Moving Average (EMA) for daily price changes (high - low) divided by 9-bar EMA applied twice to that range. The study provides setup and trigger lines which are used to identify trend reversal: the index line should surpass the setup line and then drop below the trigger line.',
        mi: {
            title: 'MI',
        },
        trigger: {
            title: 'Trigger',
        },
        setup: {
            title: 'Setup',
        },
    },
    median_price: {
        title: 'Median Price',
        description: 'Median Price is simply an average of High and Low prices.',
        mp: {
            title: 'MP',
        },
    },
    momentum: {
        title: 'Momentum',
        description: 'Momentum is an indicator that quantifies acceleration and deceleration of the market prices over a specified period of time. The indicator line fluctuates above or below the zero line indicating uptrend (crosses above the zero line) or downtrend (crosses below the zero line).',
        momentum: {
            title: 'Momentum',
        },
        zero: {
            title: 'Zero',
        },
    },
    money_flow_index: {
        title: 'Money Flow Index',
        description: 'Money Flow Index (MFI) is a momentum oscillator that measures the ratio of money flowing into and out of a security over a specified period. MFI is similar to Relative Strength Index (RSI) but unlike RSI, it incorporates not only a Typical Price but also volume data. The index is bounded to the 0 to +100 scale, where the readings above 80 indicate overbought (bearish signal) and the readings below 20 suggest oversold (bullish signal) prices.',
        mfi_dx: {
            title: 'MFIdx',
        },
        over_bought: {
            title: 'OverBought',
        },
        over_sold: {
            title: 'OverSold',
        },
    },
    negative_volume_index: {
        title: 'Negative Volume Index',
        description: 'Negative Volume Index (NVI) is a cumulative indicator that determines what "smart money" is doing. Smart money is the capital controlled by major investors firms (central banks, funds, market mavens, and so on). The indicator assumes that when volume decreases, the "smart money" is active, and vice versa. The index is calculated by adding the percentage change of the closing price to the previous value of NVI. The initial value is equal to 100.',
        nvi: {
            title: 'NVI',
        },
    },
    on_balance_volume: {
        title: 'On Balance Volume',
        description: `On Balance Volume (OBV) is a momentum indicator that uses volume flow to predict changes in a security price. The OBV values are calculated as the cumulative total of the up and down volume. When the close is higher than the previous close, the volume is added to the running total (up-volume), and when the close is lower than the previous close, the volume is subtracted from the running total (down-volume). If the price moves before OBV,  it's a "non-confirmed" move which is tend to occur at bull market tops or at bear market bottoms. A series of rising peaks, or failing troughs in OBV indicates a strong trend. If OBV is flat, then the market is not trending.`,
        obv: {
            title: 'OBV',
        },
    },
    parabolic_sar: {
        title: 'Parabolic SAR',
        description: `Parabolic SAR (Stop and Reverse) is a trend-following indicator that can be used to set a trailing stop or determine entry/exit points. The SAR follows prices as they move up or down and indicates the "stop and reverse" points (dots) on the chart. When the dots are below prices, SAR signifies the bullish trend, when the dots are above prices, the market is bearish.`,
        sar: {
            title: 'SAR',
        },
    },
    percent_change: {
        title: 'Percent Change',
        description: 'The Percent Change study simply calculates the change (in percent) between the current and previous prices over a specified period of time.',
        percent_change: {
            title: 'PercentChange',
        },
        zero: {
            title: 'Zero',
        },
    },
    percent_of_resistance: {
        title: 'Percent Of Resistance',
        description: `The Percent of Resistance (PCR) oscillator represents the resistance of a security as a percentage ratio. To calculate the ratio, PCR compares a security's closing price with its price range over a specified period of time. The PCR line oscillates on the 20 to +80 scale, where readings below 20 can be considered as a buy signal and the readings above 80 as a signal to sell.`,
        por: {
            title: 'POR',
        },
        over_bought: {
            title: 'OverBought',
        },
        over_sold: {
            title: 'OverSold',
        },
    },
    percentage_price_oscillator: {
        title: 'Percentage Price Oscillator',
        description: 'Percent Price Oscillator (PPO) is a momentum indicator that measures the percentage change between fast (9-bar length) and slow (18-bar length) moving averages of price, divided by the slow moving average. PPO gives divergence signals based on the difference between prices and the oscillator line. The values are represented above or below the zero level, indicating a security being oversold or overbought respectively.',
        percentage_price_oscillator: {
            title: 'PercentagePriceOscillator',
        },
        zero: {
            title: 'Zero',
        },
    },
    pivot_points: {
        title: 'Pivot Points',
        description: `Pivot Points are support and resistance levels used to determine overall trend over daily, weekly, or monthly aggregation periods. Pivot Points comprise a base level, which is called Pivot Point (PP), and three resistance and support levels above and below PP. The levels use the following calculations:

		• Resistance Level 3 = Previous Day High +2(Pivot - Previous Day Low)
		• Resistance Level 2 = Pivot + (Resistance Level 1 - Support Level 1)
		• Resistance Level 1 = (Pivot x 2) - Previous Day Low
		• PP = Previous Day (High + Low + Close) / 3
		• Support Level 1 = (Pivot x 2) - Previous Day High
		• Support Level 2 = Pivot - (Resistance Level 1 - Support Level 1)
		• Support Level 3 = Previous Day Low - 2(Previous Day High - PP)`,
        r1: {
            title: 'R1',
        },
        r2: {
            title: 'R2',
        },
        r3: {
            title: 'R3',
        },
        pp: {
            title: 'PP',
        },
        s1: {
            title: 'S1',
        },
        s2: {
            title: 'S2',
        },
        s3: {
            title: 'S3',
        },
    },
    price_channel: {
        title: 'Price Channel',
        description: `Price Channel is an indicator that helps identify breakouts that occur when a security's price moves either above the upper or below the lower channel line. The upper line is plotted on the highest price over a time period, and lower line is plotted on the lowest price over a time period.`,
        pcu: {
            title: 'PCU',
        },
        pcl: {
            title: 'PCL',
        },
    },
    price_oscillator: {
        title: 'Price Oscillator',
        description: 'Price Oscillator is a momentum indicator that measures the difference between fast (9-bar length) and slow (18-bar length) moving averages of price divided by the slow moving average. The values oscillate above or below the zero level and can be considered as a Buy or Sell signals respectively.',
        price_oscillator: {
            title: 'PriceOscillator',
        },
        zero: {
            title: 'Zero',
        },
    },
    price_and_volume_trend: {
        title: 'Price and Volume Trend',
        description: `The Price and Volume Trend (PVT) study helps determine the strength and direction of a security's price change. PVT is calculated as a cumulative sum of percentage change of Close prices multiplied by daily volumes. If the price moves before PVT,  it's a "non-confirmed" move which is tend to occur at bull market tops or at bear market bottoms. A series of rising peaks, or failing troughs in the PVT indicates a strong trend. If PVT is flat, then the market is not trending.`,
        pvt: {
            title: 'PVT',
        },
    },
    roc: {
        title: 'Rate Of Change',
        description: 'Rate of Change (ROC) is a momentum indicator that compares the current price with the price n-periods ago to reflect the strength of the price change as a percentage value. The ROC line oscillates above or below the zero level and can help confirm an uptrend or downtrend respectively.',
        roc: {
            title: 'ROC',
        },
        zero: {
            title: 'Zero',
        },
    },
    relative_strength_index: {
        title: 'Relative Strength Index',
        description: 'Rate of Change (ROC) is a momentum indicator that compares the current price with the price n-periods ago to reflect the strength of the price change as a percentage value. The ROC line oscillates above or below the zero level and can help confirm an uptrend or downtrend respectively.',
        rsi: {
            title: 'RSI',
        },
        over_bought: {
            title: 'OverBought',
        },
        over_sold: {
            title: 'OverSold',
        },
    },
    relative_vigor_index: {
        title: 'Relative Vigor Index',
        description: 'Relative Vigor Index (RVI) is a momentum oscillator based on the concept that prices are tend to close higher than they open in uptrends and close lower than they open in downtrends. RVI values are calculated as the difference between the Close price and its trading range. The oscillator helps reveal divergence which can be considered as a near-term change in the trend.',
        rvi: {
            title: 'RVI',
        },
    },
    relative_vigor_index_sma: {
        title: 'Relative Vigor Index Simple Moving Average',
        description: 'The Relative Vigor Index Simple Moving Average (RVIMA) study is Relative Vigor Index (RVI) smoothed with SMA. Likewise RVI, RVIMA is based on the concept that prices are tend to close higher than they open in uptrends and close lower than they open in downtrends. RVI values are calculated as the difference between the Close price and its trading range. The study helps reveal divergence which can be considered as a near-term change in the trend.',
        rvi: {
            title: 'RVI',
        },
    },
    relative_volatility_index: {
        title: 'Relative Volatility Index',
        description: 'Relative Volatility Index (RVI) is a volatility indicator based on Relative Strength Index (RSI). RVI uses 9-period standard deviation over several last bars instead of average price change, which is used in RSI. The indicator values utilize on the scale from 0 to +100 with overbought/oversold levels. The volatility direction is interpreted as upside when the line is above 50, and downside when the line is below 50.',
        rvi: {
            title: 'RVI',
        },
        over_bought: {
            title: 'OverBought',
        },
        over_sold: {
            title: 'OverSold',
        },
    },
    sma: {
        title: 'Simple Moving Average',
        description: `The Simple Moving Average (SMA) study is an arithmetic mean of security's price over a number of time periods. The fewer time periods are used, the more responsive the moving average to the price changes. SMA results as a smoothed line that makes it easier to identify the price trend.`,
        sma: {
            title: 'SMA',
        },
    },
    sma_envelope: {
        title: 'Simple Moving Average Envelope',
        description: 'The Simple Moving Average Envelope (SMAE) study plots two Simple Moving Averages (SMAs) as upper and lower lines (envelopes) over a price chart. The envelopes indicate overbought and oversold conditions and can be shifted up and down by fixed percentage value.',
        upper_band: {
            title: 'UpperBand',
        },
        lower_band: {
            title: 'LowerBand',
        },
    },
    smma: {
        title: 'Smoothed Moving Average',
        description: 'The Smoothed Moving Average (SMMA) study is an Exponential Moving Average (EMA) smoothed with a longer time period. SMMA takes more data points for calculation and provides more accurate results than Simple Moving Average (SMA) plotting the line with fewer fluctuations.',
        smma: {
            title: 'SMMA',
        },
    },
    smma_envelope: {
        title: 'Smoothed Moving Average Envelope',
        description: 'The Smoothed Moving Average Envelope (SMMAE) study plots two Smoothed Moving Averages (SMMAs) as upper and lower lines (envelopes) over a price chart. The envelopes indicate overbought and oversold conditions and can be shifted up and down by fixed percentage value.',
        upper_band: {
            title: 'UpperBand',
        },
        lower_band: {
            title: 'LowerBand',
        },
    },
    starc_bands: {
        title: 'Stoller Average Range Channel Bands',
        description: `Stoller Average Range Channel Bands (STARC) is an indicator that plots two bands (support and resistance levels) above and below a security price's Simple Moving Average (SMA). Likewise Bollinger Bands (BB), STARC creates bands around a simple moving average, the only difference that BB uses standard deviations for calculation while STARC uses the Average True Range (ATR) values. The upper band (STARC+) is calculated by adding the ATR value to SMA. The lower band (STARC-) is calculated by subtracting the value of ATR from the SMA.`,
        upper_band: {
            title: 'UpperBand',
        },
        mid_line: {
            title: 'MidLine',
        },
        lower_band: {
            title: 'LowerBand',
        },
    },
    schaff_trend_cycle: {
        title: 'Schaff Trend Cycle',
        description: 'Schaff Trend Cycle (SCT) is an oscillator used to identify or confirm price direction and market turning points in repeating high and low price patterns (cycles). The oscillator is based on Moving Average Convergence Divergence (MACD) double smoothed with Slow Stochastic which makes it more sensitive to the market price changes. The STC line oscillates on the scale from 0 to +100 with oversold and overbought levels at 20 and 80 respectively.',
        schaff_t_c: {
            title: 'SchaffTC',
        },
        over_bought: {
            title: 'OverBought',
        },
        over_sold: {
            title: 'OverSold',
        },
    },
    slow_stochastic: {
        title: 'Slow Stochastic',
        description: 'The Slow Stochastic study is a momentum oscillator that measures the market strength by comparing the closing price of a security with its price range over period of time. The oscillator is bounded to the range from 0 to +100 and is consisted of two lines: SlowK, derived out of Fast Stochastic by applying 3-day Simple Moving Average (SMA) to its FastK plot, and its smoothed version SlowD. Crossover of SlowK and SlowD with overbought/oversold levels generates sell (above 80) and buy (below 20) signals respectively.',
        slow_k: {
            title: 'SlowK',
        },
        slow_d: {
            title: 'SlowD',
        },
        over_bought: {
            title: 'OverBought',
        },
        over_sold: {
            title: 'OverSold',
        },
    },
    smoothed_rate_of_change: {
        title: 'Smoothed Rate Of Change',
        description: 'Smoothed Rate of Change (SROC) is a smoothed version of Rate of Change (ROC) indicator with the only difference that it uses Exponential Moving Average (EMA) for calculation. SROC determines the strength of a trend by comparing the current EMA and an EMA a specified period ago. The SROC line oscillates above or below the zero level and can help confirm an uptrend or downtrend respectively.',
        roc: {
            title: 'ROC',
        },
        zero: {
            title: 'Zero',
        },
    },
    spearman: {
        title: 'Spearman',
        description: `The Spearman study is a trend confirmation oscillator that is based on the Spearman's coefficient. The coefficient is used to determine correlation between actual price movements and the current trend i.e. the oscillator shows the strength of prevailing trend. The study then plots a Spearman's line and its smoothed with SMA version (SpearmanAverage). The both lines oscillate above or below the zero level on the scale from -100 to +100. The Spearman's line above 80 suggests an uptrend whereas the Spearman's line below -80 indicates a downtrend. Crossover between both Spearman and SpearmanAverage can indicate possible reversal points while crossing above or below zero level might be a signal to buy or sell respectively.`,
        spearman: {
            title: 'Spearman',
        },
        spearman_average: {
            title: 'SpearmanAverage',
        },
        over_bought: {
            title: 'OverBought',
        },
        over_sold: {
            title: 'OverSold',
        },
        zero: {
            title: 'Zero',
        },
    },
    standard_deviation: {
        title: 'Standard Deviation',
        description: 'The Standard Deviation study measures market volatility i.e. how widely prices are dispersed from the average price for a specified period.',
        std_dev: {
            title: 'StdDev',
        },
    },
    standard_deviation_channel: {
        title: 'Standard Deviation Channel',
        description: 'Standard Deviation Channel (SDC) is a channel that consists of a linear regression line in the middle and support/resistance levels, which are standard deviations placed equidistantly above and below the middle line.',
        lin_reg: {
            title: 'LinReg',
        },
        resistance: {
            title: 'Resistance',
        },
        support: {
            title: 'Support',
        },
    },
    standard_error_bands: {
        title: 'Standard Error Bands',
        description: 'The Standard Error Bands (SEB) indicator shows the direction of the current trend by plotting a linear regression average value (middle line) and the volatility deviation by plotting upper and lower bands. The deviation from the linear regression indicates increased volatility and risk. The indicator is similar to Bollinger Bands (BB) with the only difference that SEB uses the linear regression instead of moving average that is used in BB.',
        upper_band: {
            title: 'UpperBand',
        },
        mid_line: {
            title: 'MidLine',
        },
        lower_band: {
            title: 'LowerBand',
        },
    },
    std_dev_volatility: {
        title: 'Standard Deviation Volatility',
        description: 'Standard Deviation Volatility is an indicator that measures volatility dispersion i.e. the difference between the actual price and the average price value. The indicator can be used to determine the strength of the market price movements. The stronger the price deviation from zero, the higher the volatility is.',
        std_dev_vlt: {
            title: 'StdDevVlt',
        },
    },
    swing_index: {
        title: 'Swing Index',
        description: 'Swing Index (SI) is a study that attempts to predict future short-term price movements. SI is used as a part of Accumulation Swing Index and is calculated as the difference between the current and previous OHLC values.',
        si: {
            title: 'SI',
        },
        zero: {
            title: 'Zero',
        },
    },
    tema: {
        title: 'Triple Exponential Moving Average',
        description: 'Triple Exponential Moving Average (TEMA) is a moving average indicator that reacts to price changes faster than a traditional SMA or EMA. The indicator smooths out the line with multiple EMAs and reduces the lag by placing more weight on recent values. TEMA is calculated in the following way: 3 EMA of price - 3 EMA of the first EMA + EMA of EMA of EMA.',
        tema: {
            title: 'TEMA',
        },
    },
    tma: {
        title: 'Triangular Moving Average',
        description: 'Triangular Moving Average (TMA) is an indicator that is basically a double-smoothed Simple Moving Average (SMA) which means it applies extra weight to the line. TMA is considered more suitable to slow-moving markets because of its significant lags.',
        tma: {
            title: 'TMA',
        },
    },
    trix: {
        title: 'Triple Exponential Average',
        description: 'Triple Exponential Average (TRIX) is a histogram-type oscillator that quantifies the current market momentum. TRIX is calculated as a moving average that has been smoothed three times with an Exponential Moving Average (EMA). TRIX oscillates above or below the zero line where the extreme values can indicate corresponding overbought and oversold areas. Additionally, TRIX crossing above or below the zero line can give buying or selling signals respectively.',
        trix: {
            title: 'TRIX',
        },
        zero: {
            title: 'Zero',
        },
    },
    time_series_forecast: {
        title: 'Time Series Forecast',
        description: "The Time Series Forecast (TSF) study used for predicting of the future price movements. The Time Series Forecast calculation is based on the linear regression algorithm which makes TSF more responsive to the prices than the classic moving averages: the study can avoid the lagging effect when adjusting to the price changes. This estimate is based on the trend of the security's prices over a specified period: if the current trend continues, the TFS's value is a forecast of the next period's price.",
        tsf: {
            title: 'TSF',
        },
    },
    true_strength_index: {
        title: 'True Strength Index',
        description: 'True Strength Index (TSI) is a momentum oscillator used to identify trends and reversals. Both TSI and signal lines fluctuate on the scale from -40 to +40 determining a downtrend and uptrend when TSI above or below zero respectively. When TSI crosses above the signal line it can be used as a buy signal, and when it crosses below, a sell signal.',
        tsi: {
            title: 'TSI',
        },
        signal: {
            title: 'Signal',
        },
        zero: {
            title: 'Zero',
        },
    },
    typical_price: {
        title: 'Typical Price',
        description: `The Typical Price (TP) study plots a single line that is a day's average price. It is calculated as a sum of High, Low, and Close prices divided by 3. TP is also used in Money Flow Index (MFI) and Commodity Channel Index (CCI).`,
        tp: {
            title: 'TP',
        },
    },
    ultimate_oscillator: {
        title: 'Ultimate Oscillator',
        description: 'Ultimate Oscillator (UO) is a momentum oscillator that shows the price momentum based on the weighted average of three different time frames: 7-period, 14-period, and 28-period. UO oscillates on the scale from 0 to +100 and generates buy and sell signals related to divergences between the oscillator line and price.',
        uo: {
            title: 'UO',
        },
    },
    vertical_horizontal_filter: {
        title: 'Vertical Horizontal Filter',
        description: 'Vertical Horizontal Filter (VHF) study determines whether prices are trending (VHF rises) or are stabilizing around a specific range (VHF falls). VHF values are calculated as the difference between the highest close and the lowest close for a specified period. The difference is then divided by the sum of an absolute value of daily close changes over the same period.',
        vhf: {
            title: 'VHF',
        },
    },
    volume_weighted_average_price: {
        title: 'Volume Weighted Average Price',
        description: 'Volume Weighted Average Price (VWAP) is an indicator that shows a daily average weighted price the security has been traded at. Likewise a usual SMA, the indicator provides a less volatile view of the recent price trend, however, it considers both price and volume during calculation. VWAP is calculated as Typical Price multiplied by volume and then divided by cumulative volume aggregated through the day.',
        vwap: {
            title: 'VWAP',
        },
    },
    wma: {
        title: 'Weighted Moving Average',
        description: 'Weighted Moving Average (WMA) is a moving-average-type indicator that follows prices more closely than SMA as it puts more weight on recent data and less on past data.',
        wma: {
            title: 'WMA',
        },
    },
    wma_envelope: {
        title: 'Weighted Moving Average Envelope',
        description: 'The Weighted Moving Average Envelope study plots two Weighted Moving Averages (WMAs) as an upper and lower lines (envelopes). The envelopes indicate overbought and oversold conditions and can be shifted up and down by fixed percentage value.',
        upper_band: {
            title: 'UpperBand',
        },
        lower_band: {
            title: 'LowerBand',
        },
    },
    weighted_close: {
        title: 'Weighted Close',
        description: 'Weighted Close is a Typical Price indicator that places a greater weight on the Close price during calculation. Weighted Close is calculated as the sum of High, Low, and double-Close price values for a specified period divided by 4. The study additionally provides a Simple Moving Average (SMA) of the weighted Close.',
        wtd_close: {
            title: 'WtdClose',
        },
        avg: {
            title: 'Avg',
        },
    },
    wilders_smoothing: {
        title: 'Wilders Smoothing',
        description: `The Wilders Smoothing study is similar to Exponential Moving Average (EMA) with the only difference that it responds to price changes with more lag. The study uses a smoothing factor that reduces the time period of standard EMA during calculation so that, for example, the Wilder's Smoothing of 10-period length becomes equivalent to a 19-period EMA.`,
        ws: {
            title: 'WS',
        },
    },
    williams_ad: {
        title: 'Williams Accumulation/Distribution',
        description: `Williams Accumulation/Distribution (Williams AD) is an indicator that measures market pressure i.e. whether an asset is accumulated (buyers pressure prevails) or distributed (sellers pressure prevails). The indicator may be used for analyzing divergences with price: when the price makes a new low, but the indicator doesn't, the price is likely to turn up, and vice versa.

		Williams AD uses True Range High (TRH) and True Range Low (TRL) values during calculation. TRH is the greatest of yesterday's close and today's high, while TRL is the least of yesterday's close and today's low. The indicator compares today's close price to yesterday's close price:

		• If today's close is greater than yesterday's close, the indicator adds the difference between today's close and TRL. 
		• If today's close is less than yesterday's close, the indicator adds the difference between today's close and TRH. 
		• If today's close is equal to yesterday's close, the indicator is unchanged.
		
		The indicator then calculates a cumulative total of these values and plots a line starting from the zero level.`,
        wad: {
            title: 'WAD',
        },
        zero: {
            title: 'Zero',
        },
    },
    williams_alligator: {
        title: 'Williams Alligator',
        description: 'The Williams Alligator study is a trend-following indicator that uses three smoothed Simple Moving Averages (SMAs) of different periods: 5-period SMA (Jaw), 8-period SMA (Teeth), and 13-period SMA (Lips). The indicator generates trading signals based on convergence/divergence relationship of the Jaw SMA making the slowest turns and the Lips SMA making the fastest turns.',
        jaw: {
            title: 'Jaw',
        },
        teeth: {
            title: 'Teeth',
        },
        lips: {
            title: 'Lips',
        },
    },
    williams_fractal: {
        title: 'Williams Fractal',
        description: 'Williams Fractal is a pattern that helps detect reversal points (highs and lows) marking them with up and down arrows. The upward fractal is a series of at least five successive bars where the highest price is reached in the middle, surrounded by lower highs. Conversely, the downward fractal is a sequence of five bars with the lowest value in the middle, preceded and followed by lower highs.',
        up_fractal: {
            title: 'UpFractal',
        },
        down_fractal: {
            title: 'DownFractal',
        },
    },
    williams_percent_range: {
        title: 'Williams Percent Range',
        description: 'Williams Percent Range (WPR) is a momentum indicator that can be used to identify where a security might be overbought or oversold. The indicator line oscillates on the scale from 0 to -100 with overbought and oversold levels at -20 and -80 respectively. WPR is calculated as a ratio between the closing price of a security and the high/low range over a specific period.',
        wpr: {
            title: 'WPR',
        },
        over_bought: {
            title: 'OverBought',
        },
        over_sold: {
            title: 'OverSold',
        },
    },
    wtwc: {
        title: 'WaveTrend with Crosses',
        description: 'WaveTrend with Crosses is an enhanced WaveTrend oscillator that additionally highlights sell and buy points on the chart.',
        zero: {
            title: 'Zero',
        },
        ob1: {
            title: 'Over Bought Level 1',
        },
        ob2: {
            title: 'Over Bought Level 2',
        },
        os1: {
            title: 'Over Sold Level 1',
        },
        os2: {
            title: 'Over Sold Level 2',
        },
        wt1: {
            title: 'Wave Trend 1',
        },
        wt2: {
            title: 'Wave Trend 2',
        },
        wtDiff: {
            title: 'Wave Difference',
        },
        crosses1: {
            title: 'Crosses 1',
        },
        crosses2: {
            title: 'Crosses 2',
        },
        candle1: {
            title: 'Candles 1',
        },
        candle2: {
            title: 'Candles 2',
        },
    },
    zigzag: {
        title: 'Zig Zag',
        description: 'Zig Zag is an indicator that plots straight lines appeared as zig-zag across the chart. It is usually used to highlight swing highs and swing lows without unnecessary noise on the price chart.',
        zigzag: {
            title: 'ZigZag',
        },
    },
};
