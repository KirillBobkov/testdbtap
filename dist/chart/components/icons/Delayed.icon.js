// @ts-nocheck
import React, { memo, useContext } from 'react';
import { IconsRenderContext } from '../multi-chart/icons-render-context';
export const DelayedIcon = memo(({ label }) => {
    const { svgShapeRendering } = useContext(IconsRenderContext);
    return (React.createElement("span", { "data-icon-name": label },
        React.createElement("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { shapeRendering: svgShapeRendering, d: "M5.95097 12.2683C5.77436 12.1985 5.59948 12.12 5.42633 12.0328C5.25319 11.9421 5.07485 11.8549 4.89131 11.7711C4.70431 11.6874 4.50519 11.6194 4.29395 11.567C4.07925 11.5112 3.84204 11.4833 3.58232 11.4833C3.10789 11.4833 2.6958 11.431 2.34605 11.3263C1.99629 11.2182 1.72618 11.0681 1.53572 10.8763C1.34526 10.6809 1.25003 10.4489 1.25003 10.1802C1.25003 9.56622 1.35218 9.02895 1.5565 8.56843C1.75735 8.10442 2.04131 7.74334 2.40838 7.48517C2.77199 7.227 3.1962 7.09791 3.68101 7.09791C4.09656 7.09791 4.46017 7.18164 4.77184 7.34911C5.0835 7.51308 5.34322 7.74334 5.551 8.03988C5.75878 8.33643 5.91634 8.68182 6.02369 9.07605C6.09295 9.3098 6.1726 9.50691 6.26263 9.6674C6.35267 9.82788 6.4531 9.9622 6.56391 10.0703C6.67126 10.1785 6.78727 10.271 6.91194 10.3477C6.78381 10.5884 6.6349 10.885 6.46522 11.2373C6.29207 11.5862 6.12065 11.9299 5.95097 12.2683ZM3.56154 9.68833C3.70352 9.68833 3.82646 9.63774 3.93034 9.53657C4.03077 9.4319 4.08098 9.30805 4.08098 9.16501C4.08098 9.02197 4.03077 8.89987 3.93034 8.79869C3.82646 8.69752 3.70352 8.64693 3.56154 8.64693C3.42302 8.64693 3.30355 8.69752 3.20313 8.79869C3.09924 8.89987 3.04729 9.02197 3.04729 9.16501C3.04729 9.30805 3.09924 9.4319 3.20313 9.53657C3.30355 9.63774 3.42302 9.68833 3.56154 9.68833ZM12.4544 9.57843C11.7479 9.57843 11.0969 9.44586 10.5013 9.18071C9.90565 8.91556 9.37236 8.51959 8.9014 7.99278C9.22345 7.59506 9.55935 7.26712 9.90911 7.00895C10.2554 6.75078 10.6329 6.56064 11.0415 6.43854C11.4501 6.31294 11.9072 6.25014 12.4128 6.25014C12.9219 6.24665 13.3842 6.30771 13.7997 6.4333C14.2118 6.5589 14.5962 6.75252 14.9529 7.01418C15.3061 7.27584 15.6437 7.61425 15.9658 8.02942C15.4948 8.54924 14.9598 8.93824 14.3607 9.19641C13.7616 9.45109 13.1262 9.57843 12.4544 9.57843ZM15.8723 12.9748C15.5953 12.734 15.3459 12.4462 15.1243 12.1113C14.8992 11.7764 14.7157 11.4257 14.5737 11.0594C14.4317 10.6896 14.3417 10.3338 14.3036 9.99185C14.6707 9.85928 15.0429 9.67612 15.4204 9.44237C15.7944 9.20862 16.1234 8.94173 16.4073 8.6417C16.5285 8.82311 16.6497 9.01674 16.7709 9.22258C16.8887 9.42493 17.0047 9.63949 17.119 9.86626C17.2713 10.1663 17.4272 10.421 17.5865 10.6303C17.7457 10.8396 17.8981 11.0176 18.0436 11.1641C18.189 11.3071 18.3171 11.4345 18.4279 11.5461C18.5318 11.6473 18.6115 11.745 18.6669 11.8392C18.7223 11.9299 18.75 12.038 18.75 12.1636C18.75 12.345 18.6669 12.4846 18.5007 12.5823C18.331 12.68 18.092 12.7288 17.7838 12.7288H17.1865C16.9268 12.7288 16.693 12.7532 16.4852 12.8021C16.274 12.8474 16.0697 12.905 15.8723 12.9748ZM12.444 14.147C12.0492 14.147 11.6873 14.0964 11.3584 13.9952C11.0259 13.894 10.7229 13.7737 10.4493 13.6341C10.1758 13.4946 9.92123 13.3672 9.68575 13.2521C9.98356 12.9939 10.2416 12.6991 10.4597 12.3677C10.6779 12.0363 10.851 11.6857 10.9792 11.3158C11.1073 10.9425 11.1835 10.564 11.2077 10.1802C11.6129 10.2814 12.0232 10.332 12.4388 10.332C12.6466 10.3355 12.8509 10.325 13.0517 10.3006C13.2526 10.2762 13.45 10.2396 13.6439 10.1907C13.6751 10.557 13.7547 10.9251 13.8828 11.2949C14.0075 11.6647 14.1772 12.0206 14.3919 12.3625C14.6031 12.7009 14.8542 13.0044 15.1451 13.273C14.9131 13.3672 14.6637 13.4841 14.3971 13.6237C14.1304 13.7632 13.8361 13.8853 13.514 13.99C13.192 14.0946 12.8353 14.147 12.444 14.147ZM9.02606 12.9486C8.80097 12.8858 8.56895 12.8317 8.33001 12.7864C8.0876 12.7375 7.82788 12.7044 7.55085 12.6869C7.34653 12.6834 7.15088 12.666 6.96388 12.6346C6.77688 12.5997 6.63144 12.5509 6.52755 12.4881C6.62105 12.3276 6.73186 12.1183 6.85999 11.8601C6.98812 11.6019 7.12491 11.3193 7.27035 11.0123C7.41233 10.7018 7.55604 10.3931 7.70149 10.086C7.84693 9.77904 7.98718 9.4947 8.12223 9.23304C8.25729 8.9679 8.37849 8.74985 8.48584 8.5789C8.67977 8.78125 8.89447 8.97313 9.12995 9.15455C9.36197 9.33247 9.59918 9.49296 9.84158 9.636C10.084 9.77555 10.316 9.88719 10.5376 9.97092C10.5065 10.3198 10.4251 10.6739 10.2935 11.0333C10.1619 11.3926 9.99049 11.7362 9.77925 12.0642C9.56455 12.3921 9.31349 12.6869 9.02606 12.9486ZM17.28 14.9895C16.8194 14.9895 16.3779 14.9058 15.9554 14.7383C15.5295 14.5709 15.1936 14.3493 14.9477 14.0737C15.249 13.8993 15.5728 13.7353 15.919 13.5818C16.2653 13.4318 16.6047 13.3289 16.9372 13.273C17.0757 13.3149 17.2159 13.3463 17.3579 13.3672C17.4964 13.3882 17.6453 13.4178 17.8046 13.4562C17.9951 13.4946 18.1682 13.5661 18.3241 13.6708C18.4764 13.7754 18.5526 13.9289 18.5526 14.1313C18.5526 14.4034 18.4331 14.6145 18.1942 14.7645C17.9518 14.9145 17.6471 14.9895 17.28 14.9895ZM7.57682 15C7.20282 15 6.89462 14.925 6.65222 14.775C6.40635 14.6249 6.28341 14.4121 6.28341 14.1365C6.28341 13.9865 6.32324 13.8557 6.40288 13.744C6.48253 13.6359 6.58642 13.5487 6.71455 13.4824C6.84268 13.4126 6.97773 13.3672 7.11971 13.3463C7.26516 13.3358 7.40021 13.3254 7.52488 13.3149C7.64608 13.3044 7.78113 13.2905 7.93004 13.273C8.14821 13.3044 8.37849 13.3603 8.6209 13.4405C8.85984 13.5207 9.09532 13.6149 9.32734 13.7231C9.55589 13.8347 9.76194 13.9464 9.94547 14.058C9.78618 14.2499 9.58013 14.4156 9.32734 14.5552C9.07108 14.6982 8.79231 14.8081 8.49104 14.8849C8.1863 14.9616 7.88156 15 7.57682 15Z", fill: "currentColor" }))));
});
