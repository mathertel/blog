CMD /C npm run clean
CMD /C npm run build:prod
robocopy _site ..\mathertel-WebSite\mathertel9\wwwroot\blog /FFT /S /PURGE