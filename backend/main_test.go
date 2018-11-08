package main

// Copyright (c) 2018 by Extreme Networks Inc.

import "testing"

func TestGetVersion(t *testing.T) {
    // try something bad
	versionPath := "junk/"
	err := loadVersion(versionPath)
	if err == nil {
		t.Error("Should have failed finding version at", versionPath)
		t.FailNow()
	}

    // try something good
	versionPath = "../"
	err = loadVersion(versionPath)
	if err != nil {
		t.Error(err)
		t.FailNow()
	}

	version := GetVersion()
	if len(version) == 0 {
		t.Error("Version string is not set")
		t.FailNow()
	}
	t.Log("version file is found at path", versionPath, "Version:", version)
}

func TestInitUI(t *testing.T) {
    // try something bad
	staticFilePath := "../junk/staticui.zip"
	err := initUI(staticFilePath)
	if err == nil {
		t.Error("Loading static UI file should have failed with", staticFilePath)
		t.FailNow()
	}

    // try something good
	staticFilePath = "../_bin/staticui.zip"
	err = initUI(staticFilePath)
	if err != nil {
		t.Error("Cannot load static UI file at", staticFilePath)
		t.FailNow()
	}
	t.Log("Found static ui file at", staticFilePath)
}
