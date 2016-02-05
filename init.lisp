(ql:quickload :hunchentoot)

(defpackage :brailletutorial
  (:use :common-lisp :hunchentoot))

(in-package :brailletutorial)

;; Needed if you set :error-template-directory in the easy-acceptor
(setf hunchentoot::*show-lisp-errors-p* t)

(defvar brailletutorial-server
  (make-instance 'hunchentoot:easy-acceptor
                 :document-root "."
                 :error-template-directory "static/error-templates/"
                 :access-log-destination "logs/access.log"
                 :message-log-destination "logs/error.log"
                 :port 8085))

(load "static.lisp")

(hunchentoot:start brailletutorial-server)