PORT ?= 8000

.PHONY: live
live:
	python3 -m http.server $(PORT)
