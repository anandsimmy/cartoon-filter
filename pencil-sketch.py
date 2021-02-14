import sys
import cv2
import numpy as np

num_down = 2
num_bilateral = 7

img_rgb = cv2.imread(f"uploads/{sys.argv[1]}")
h, w, c = img_rgb.shape
img_rgb = cv2.resize(img_rgb, (w, h))

img_gray = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2GRAY)
img_blur = cv2.GaussianBlur(img_gray, (21, 21), 0, 0)

img_blend = cv2.divide(img_gray, img_blur, scale=256)
img_blend = cv2.resize(img_rgb, (w, h))
img_blend = cv2.multiply(img_blend, img_rgb, scale=1. / 256)
img_blend = cv2.adaptiveThreshold(img_blur, 255,
                                  cv2.ADAPTIVE_THRESH_MEAN_C,
                                  cv2.THRESH_BINARY,
                                  blockSize=9,
                                  C=2)
img_blend = cv2.cvtColor(img_blend, cv2.COLOR_GRAY2RGB)

cv2.imwrite('filter.jpg', img_blend)
