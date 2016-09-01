FROM mhart/alpine-node:6.3.0
RUN mkdir -p /usr/src/app
COPY . /usr/src/app
EXPOSE 8080
WORKDIR /usr/src/app
#ENTRYPOINT ["/usr/src/app/run.sh"]
CMD ["npm","start"]